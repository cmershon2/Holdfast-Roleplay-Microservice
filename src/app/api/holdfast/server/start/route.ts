import { prisma } from '@/lib/prisma';
import { prismaErrorHandler } from '@/lib/prismaErrorHandler';
import { serverTokenValidator } from '@/lib/serverTokenValidator';
import { headers } from 'next/headers'
import { NextResponse } from 'next/server';
import { z } from "zod";

export async function POST(req: Request, res: Response) {
    const headersList = headers();
    const serverToken = headersList.get('token');
    const data = await req.json();

    if(serverToken == null){
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    // validate server token
    const serverTokenAuth = await serverTokenValidator(serverToken);
    if(serverTokenAuth instanceof NextResponse){
        return serverTokenAuth;
    }

    // validate sent data
    const schema = z.object({
        serverName: z.string()
    })
    
    const response = schema.safeParse(data);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({ message: 'Invalid request', errors }, {status: 400});
    }
    

    const { serverName } = response.data;

    // attempt to create new server start event
    try {
        try {
            const event = await prisma.serverEvent.create({
                data:{
                    serverName: serverName,
                    eventType: 'START',
                    playerCount: 0
                }
            });
            
            return NextResponse.json({ message: 'Server start recorded successfully' }, {status: 200});

        } catch (error) {
            return prismaErrorHandler('Error starting server monitoring', error);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Error starting server monitoring' }, {status: 500});
    }
}