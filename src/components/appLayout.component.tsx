import { User } from "@/types/user/types";
import { SidebarNavigation } from "./sidebarNavigation.component";
import TopbarNavigation from "./topbarNavigation.component";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/constants/auth/authOptions";

export default async function AppLayout({ children } : any ) {

    const session:Session|null = await getServerSession(authOptions);
    let user:User = {
        name: session!.user?.name!,
        avatar: session!.user?.image!,
        email: session!.user?.email!
    }

    return(
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <TopbarNavigation {...user} />
            <SidebarNavigation />
            <main className="p-4 md:ml-64 h-auto pt-20">
                { children }
            </main>
        </div>
    )
}