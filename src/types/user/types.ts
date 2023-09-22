import { Role } from "@/constants/auth/roles";

export type User = {
    name: string;
    avatar: string;
    email: string;
    role: Role;
}
