import { Role } from "@/constants/auth/roles";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends DefaultUser {
    role: Role,
  }

  interface Session extends DefaultSession {
    user?: User;
  }

}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: Role,
  }
}