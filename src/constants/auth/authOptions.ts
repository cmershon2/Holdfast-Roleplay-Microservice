import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth";
import { Role } from './roles';


export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: "email",
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'hello@example.com'
                },
                password: {
                    label: 'Password', 
                    type: 'password'
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password){
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user){
                    // user not found
                    return null;
                }

                const isPasswordValid = await compare(
                    credentials.password, 
                    user.password
                );

                if(!isPasswordValid){
                    // password is not valid
                    return null;
                }

                return {
                    id: user.id+'',
                    email: user.email,
                    name: user.name,
                    image: `https://api.dicebear.com/6.x/shapes/svg?seed=${user.name}`,
                    role: Role[user.role]
                }
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
          // console.log('Session Callback', { session, token })
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              role: token.role,
            }
          }
        },
        jwt: ({ token, user }) => {
          // console.log('JWT Callback', { token, user })
          if (user) {

            const u = user as unknown as any

            return {
              ...token,
              id: u.id,
              role: u.role,
              image: u.image,
            }
          }
          return token
        }
      }
}
