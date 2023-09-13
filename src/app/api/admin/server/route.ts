import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { z } from "zod";
import { getToken } from "next-auth/jwt";
import { getRequestBody } from '@/lib/apiHelpers';

// Get all servers
export async function GET(req: NextRequest) {

    const token = await getToken({req})

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    let page = req.nextUrl.searchParams.get('page');
    let page_size = req.nextUrl.searchParams.get('page_size');

    // default return first page with 10 results
    if(page == null){ page = '0'; }
    if(page_size == null){ page_size = '10'; }

    try {

        try {
            let skip = parseInt(page) * parseInt(page_size);

            const [servers, total] = await prisma.$transaction([
                prisma.server.findMany({ skip: skip, take: parseInt(page_size)}),
                prisma.server.count() // count ALL servers
            ]);

            return NextResponse.json({ servers, page: { start: skip, total } }, {status:200});

        } catch (error) {
            return prismaErrorHandler('Error getting servers', error);
        }
        
    } catch (error) {
        console.error('Error getting servers:', error);
        return NextResponse.json({ message: 'Internal server error.' }, {status:500});
    }
}

// Update a server
export async function PATCH(req: NextRequest) {
    const token = await getToken({req})
    const data = await getRequestBody(req);

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    if(data == null){
        return NextResponse.json({ message: 'Invalid request', errors:[{message:"Missing request body"}] }, {status: 400});
    }

    // zod data validation
    const schema = z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
    })
    
    const response = schema.safeParse(data);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({ message: 'Invalid request', errors }, {status: 400});
    }

    const { id, name, description } = response.data;

    try {
        try {
            const tokenUpdate = await prisma.server.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    description: description
                }
            });

            return NextResponse.json({ message: "Successfully updated server", tokenUpdate }, {status:200});

        } catch (error) {
            return prismaErrorHandler('Error updating server',error);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error.' }, {status:500});
    }
}

// create a new server
export async function POST(req: NextRequest) {
    const token = await getToken({req})
    const data = await getRequestBody(req);


    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    if(data == null){
        return NextResponse.json({ message: 'Invalid request', errors:[{message:"Missing request body"}] }, {status: 400});
    }

    // zod data validation
    const schema = z.object({
        name: z.string(),
        description: z.string()
    })
    
    const response = schema.safeParse(data);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({ message: 'Invalid request', errors }, {status: 400});
    }

    const { name, description } = response.data;

    try {

        try {

            const servertoken = await prisma.server.create({
                data: {
                    name: name,
                    description: description,
                    status: 'OFFLINE'
                }
            });
            return NextResponse.json({ servertoken }, {status:200});
        } catch (error) {
            return prismaErrorHandler('Error creating server', error);
        }
        
    } catch (error) {
        console.error('Error creating server:', error);
        return NextResponse.json({ message: 'Internal server error.' }, {status:500});
    }
}

// delete a server token
export async function DELETE(req: NextRequest) {
    const token = await getToken({req})
    const data = await getRequestBody(req);

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    if(data == null){
        return NextResponse.json({ message: 'Invalid request', errors:[{message:"Missing request body"}] }, {status: 400});
    }

    // zod data validation
    const schema = z.object({
        id: z.string()
    })
    
    const response = schema.safeParse(data);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({ message: 'Invalid request', errors }, {status: 400});
    }

    const { id } = response.data;

    try {

        try {

            const server = await prisma.server.delete({
                where: {
                    id: id
                }
            });
            return NextResponse.json({ server }, {status:200});

        } catch (error) {
            return prismaErrorHandler('Error deleting server', error);
        }
        
    } catch (error) {
        console.error('Error deleting server:', error);
        return NextResponse.json({ message: 'Internal server error.' }, {status:500});
    }
}