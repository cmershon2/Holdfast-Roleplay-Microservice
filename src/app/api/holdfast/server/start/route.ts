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
        serverId: z.string()
    })
    
    const response = schema.safeParse(data);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({ message: 'Invalid request', errors }, {status: 400});
    }
    

    const { serverId } = response.data;

    // attempt to create new server start event
    try {
        try {
            const currentTime = new Date();

            // set server to online
            const server = await prisma.server.update({
                where:{
                    id: serverId,
                    status: "OFFLINE"
                },
                data: {
                    status: 'ONLINE',
                    lastRunDate: currentTime,
                    events: {
                        create: [
                            {
                                eventLogs: {
                                    create:[
                                        {
                                            logType: "START",
                                            playerCount: 0
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                include: {
                    events: true
                }
            });
            
            return NextResponse.json({ message: 'Server start recorded successfully', event_id: server.events[server.events.length-1].id }, {status: 200});

        } catch (error) {
            return prismaErrorHandler('Error starting server monitoring', error);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Error starting server monitoring' }, {status: 500});
    }
}