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
        playerId: z.number(),
        playerCount: z.number()
    })
    
    const response = schema.safeParse(data);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({ message: 'Invalid request', errors }, {status: 400});
    }
    

    const { serverId, eventId, playerId, playerCount } = response.data;

    // attempt to find player, create new if does not exist
    try {
        try {

            // check if server is online
            const findActiveServer = await prisma.server.count({
                where: {
                    id: serverId,
                    status: "ONLINE"
                }
            });

            // server does not exist
            if(findActiveServer == 0){
                return NextResponse.json({ message: 'Server does not exist or is not online'}, {status: 403});
            }

            // check if event exists
            const findServerEvent = await prisma.serverEvent.count({
                where: {
                    id: eventId
                }
            });

            // event does not exist
            if(findServerEvent == 0){
                return NextResponse.json({ message: 'Event does not exist'}, {status: 403});
            }

            // create player join event log
            const serverEventLog = await prisma.serverEvent.update({
                where: {
                    id: eventId
                },
                data:{
                    eventLogs: {
                        create:[
                            {
                                logType: "PLAYERLEAVE",
                                playerCount: playerCount
                            }
                        ]
                    }
                }
            })

            const returnPlayer = await prisma.holdfastUser.update({
                where: {
                    steamId: playerId
                },
                data:{
                    isOnline: false
                }
            })

            return NextResponse.json({ message: 'Player Left', player: returnPlayer }, {status: 200});
        

        } catch (error) {
            return prismaErrorHandler('Error adding player left', error);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Error adding player left' }, {status: 500});
    }
}