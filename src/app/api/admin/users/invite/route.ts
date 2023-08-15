import { getServerSession } from "next-auth/next"
import { sendInviteEmail } from "@/lib/email";
import { prisma } from '@/lib/prisma'
import { NextResponse } from "next/server";
import { authOptions } from "@/constants/auth/authOptions";

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
  }

  const { emails } = await req.json();

  try {
    const currentTime = new Date();
    const expirationTime = new Date(currentTime.getTime() + 48 * 60 * 60 * 1000); // 48 hours in milliseconds

    const inviteTokens = [];

    for (const email of emails) {
      const invite = await prisma.invite.create({
        data: {
          email,
          expiresAt: expirationTime,
        }
      });

      inviteTokens.push(invite.token);

      // Send email using sendInviteEmail function
      await sendInviteEmail(email, invite.token);
    }
    return NextResponse.json({ message: 'Invites sent successfully', inviteTokens }, {status:200});

  } catch (error) {
    console.error('Error sending invites:', error);
    return NextResponse.json({ message: 'Internal server error.' }, {status:500});
  }

}