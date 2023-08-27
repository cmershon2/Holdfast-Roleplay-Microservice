import { NextResponse } from "next/server";
import { prisma } from "./prisma";
import { prismaErrorHandler } from "./prismaErrorHandler";

export async function serverTokenValidator(serverToken: string){
    try {
        try {
            const token = await prisma.serverToken.findUnique({
                where: {
                    token: serverToken
                }
            });

            if(token == null){
                return NextResponse.json({ message: 'Unauthorized Token' }, {status: 403});
            }
    
            if(!token.active) {
                return NextResponse.json({ message: 'Inactive Token' }, {status: 400});
            }
    
            return token;
            
        } catch (error) {
           return prismaErrorHandler('Token Error', error);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Unauthorized Token' }, {status: 403});
    }
}