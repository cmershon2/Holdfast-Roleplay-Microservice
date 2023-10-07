import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { getToken } from "next-auth/jwt";
import { getRequestBody } from '@/lib/apiHelpers';
import { z } from "zod";

// Get paginated players
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

            const [players, total] = await prisma.$transaction([
                prisma.holdfastUser.findMany({ skip: skip, take: parseInt(page_size)}),
                prisma.holdfastUser.count() // count ALL servers
            ]);

            return NextResponse.json({ players, page: { start: skip, total } }, {status:200});

        } catch (error) {
            return prismaErrorHandler('Error getting players', error);
        }
        
    } catch (error) {
        console.error('Error getting players:', error);
        return NextResponse.json({ message: 'Internal server error.' }, {status:500});
    }
}

// delete a player
export async function DELETE(req: NextRequest) {
    const token = await getToken({req})
    const data = await getRequestBody(req);

    // must be ADMIN to delete players
    if (!token || token.role !== "ADMIN") {
        return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
    }

    if(data == null){
        return NextResponse.json({ message: 'Invalid request', errors:[{message:"Missing or malformed request body"}] }, {status: 400});
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

            const player = await prisma.holdfastUser.delete({
                where: {
                    id: id
                }
            });
            return NextResponse.json({ player }, {status:200});

        } catch (error) {
            return prismaErrorHandler('Error deleting player', error);
        }
        
    } catch (error) {
        console.error('Error deleting player:', error);
        return NextResponse.json({ message: 'Internal server error.' }, {status:500});
    }
}