import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendInviteEmail } from "@/lib/email";
import { prisma } from '@/lib/prisma'
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, {status: 403});
  }

  const { emails } = await req.json();

  try {
    const inviteTokens = [];

    for (const email of emails) {
      const invite = await prisma.invite.create({
        data: {
          email
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