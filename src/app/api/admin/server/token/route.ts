import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { z } from "zod";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

// Get all server tokens
export async function GET(req: NextRequest) {

    const token = await getToken({req})

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    try {

        try {

            const allServerTokens = await prisma.serverToken.findMany();
            return NextResponse.json({ allServerTokens }, {status:200});
        } catch (error) {
            return prismaErrorHandler('Error getting server tokens', error);
        }
        
    } catch (error) {
        console.error('Error getting server tokens:', error);
        return NextResponse.json({ message: 'Internal server error.' }, {status:500});
    }
}

// Update a server token
export async function PATCH(req: NextRequest) {
    const token = await getToken({req})
    const data = await req.json();

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    // zod data validation
    const schema = z.object({
        id: z.string(),
        name: z.string(),
        active: z.boolean()
    })
    
    const response = schema.safeParse(data);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({ message: 'Invalid request', errors }, {status: 400});
    }

    const { id, name, active } = response.data;

    try {
        try {
            const tokenUpdate = await prisma.serverToken.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    active: active
                }
            });

            return NextResponse.json({ message: "Successfully updated server token", tokenUpdate }, {status:200});

        } catch (error) {
            return prismaErrorHandler('Error updating server token',error);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error.' }, {status:500});
    }
}

// create a new server token
export async function POST(req: NextRequest) {
    const token = await getToken({req})
    const data = await req.json();

    console.log(data);

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    // zod data validation
    const schema = z.object({
        name: z.string()
    })
    
    const response = schema.safeParse(data);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({ message: 'Invalid request', errors }, {status: 400});
    }

    const { name } = response.data;

    try {

        try {

            const servertoken = await prisma.serverToken.create({
                data: {
                    name: name,
                    active: true
                }
            });
            return NextResponse.json({ servertoken }, {status:200});
        } catch (error) {
            return prismaErrorHandler('Error creating server token', error);
        }
        
    } catch (error) {
        console.error('Error creating server token:', error);
        return NextResponse.json({ message: 'Internal server error.' }, {status:500});
    }
}

// delete a server token
export async function DELETE(req: NextRequest) {
    const token = await getToken({req})
    const data = await req.json();

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    // zod data validation
    const schema = z.object({
        serverTokenId: z.string()
    })
    
    const response = schema.safeParse(data);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({ message: 'Invalid request', errors }, {status: 400});
    }

    const { serverTokenId } = response.data;

    try {

        try {

            const servertoken = await prisma.serverToken.delete({
                where: {
                    token: serverTokenId
                }
            });
            return NextResponse.json({ servertoken }, {status:200});

        } catch (error) {
            return prismaErrorHandler('Error deleting server token', error);
        }
        
    } catch (error) {
        console.error('Error deleting server token:', error);
        return NextResponse.json({ message: 'Internal server error.' }, {status:500});
    }
}