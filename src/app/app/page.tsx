import AppLayout from "@/components/appLayout.component";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { User } from "@/types/user/types";


export default async function Overview() {
    return (
        <AppLayout>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                
            </div>
        </AppLayout>
    )
}