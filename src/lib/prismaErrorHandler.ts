import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export function prismaErrorHandler(message: String, error : any)
{
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json({ message: message, details:error.message, errorCode:error.code, meta: error.meta}, {status:400});
    }
    else if(error instanceof Prisma.PrismaClientUnknownRequestError) {
        return NextResponse.json({ message: message, details: error.message}, {status:400});
    }
    else if(error instanceof Prisma.PrismaClientRustPanicError) {
        return NextResponse.json({ message: message, details:error.message}, {status:400});
    }
    else if(error instanceof Prisma.PrismaClientInitializationError) {
        return NextResponse.json({ message: message, details:error.message, errorCode:error.errorCode}, {status:400});
    }
    else if(error instanceof Prisma.PrismaClientValidationError) {
        return NextResponse.json({ message: message, details:error.message}, {status:400});
    }
    else {
        return NextResponse.json({ message: message, details: 'Unknown Error'}, {status:400}); 
    }
}