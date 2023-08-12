import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { token } = await req.json();

    try {
        const invite = await prisma.invite.findUnique({
            where: {
                token: token
            }
        });

        if (!invite) {
            return NextResponse.json({ message: 'Invite not found.' }, {status: 404});
        }

        if (invite.usedAt) {
            return NextResponse.json({ message: 'Invite already used.' }, {status: 403});
        }

        const currentTime = new Date();
        if (invite.expiresAt < currentTime) {
            return NextResponse.json({ message: 'Invite expired.' }, {status: 403});
        }

        return NextResponse.json({ message: 'Token verified.' }, {status: 200});

    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ message: 'Internal server error.' }, {status: 500});
    }
}