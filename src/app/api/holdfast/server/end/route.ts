import { getRequestBody } from '@/lib/apiHelpers';
import { prisma } from '@/lib/prisma';
import { prismaErrorHandler } from '@/lib/prismaErrorHandler';
import { serverTokenValidator } from '@/lib/serverTokenValidator';
import { headers } from 'next/headers'
import { NextResponse } from 'next/server';
import { z } from "zod";

export async function POST(req: Request, res: Response) {
    const headersList = headers();
    const serverToken = headersList.get('token');
    const data = await getRequestBody(req);

    if(serverToken == null){
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    if(data == null){
        return NextResponse.json({ message: 'Invalid request', errors:[{message:"Missing request body"}] }, {status: 400});
    }

    // validate server token
    const serverTokenAuth = await serverTokenValidator(serverToken);
    if(serverTokenAuth instanceof NextResponse){
        return serverTokenAuth;
    }

    // validate sent data
    const schema = z.object({
        serverId: z.string(),
        eventId: z.string(),
        playerCount: z.number()
    })
    
    const response = schema.safeParse(data);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({ message: 'Invalid request', errors }, {status: 400});
    }
    

    const { serverId, eventId, playerCount } = response.data;

    // attempt to create new server start event
    try {
        try {
            const currentTime = new Date();

            const [server, players] = await prisma.$transaction([
                prisma.server.update({
                    where:{
                        id: serverId,
                        status: "ONLINE"
                    },
                    data: {
                        status: 'OFFLINE',
                        events: {
                            update: [
                                {
                                    where:{
                                        id: eventId
                                    },
                                    data:{
                                        end: currentTime,
                                        eventLogs: {
                                            create:[
                                                {
                                                    logType: "END",
                                                    playerCount: playerCount
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    include: {
                        events: true
                    }
                }),
                prisma.holdfastUser.updateMany({
                    where: {
                        isOnline: true
                    },
                    data: {
                        isOnline: false
                    }
                })

            ]);

            
            return NextResponse.json({ message: 'Server end recorded successfully', event_id: eventId }, {status: 200});

        } catch (error) {
            return prismaErrorHandler('Error ending server monitoring', error);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Error ending server monitoring' }, {status: 500});
    }
}