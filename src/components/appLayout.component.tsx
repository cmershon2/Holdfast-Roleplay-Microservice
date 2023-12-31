import { User } from "@/types/user/types";
import { SidebarNavigation } from "./sidebarNavigation.component";
import TopbarNavigation from "./topbarNavigation.component";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/constants/auth/authOptions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function AppLayout({ children } : any ) {

    const session:Session|null = await getServerSession(authOptions);
    let user:User = {
        name: session!.user?.name!,
        avatar: session!.user?.image!,
        email: session!.user?.email!,
        role: session!.user?.role!,
    }

    return(
        <div className="antialiased dark:bg-gray-900 h-auto">
            <TopbarNavigation {...user} />
            <SidebarNavigation {...user} />
            <ToastContainer />
            <main className="p-14 md:ml-64 h-auto">
                { children }
            </main>
        </div>
    )
}