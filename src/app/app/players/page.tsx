import AppLayout from "@/components/appLayout.component";
import PlayerTable from "@/components/playerTable.component";
import { authOptions } from "@/constants/auth/authOptions";
import { User } from "@/types/user/types";
import { Session, getServerSession } from "next-auth";

export default async function Page() {

    const session:Session|null = await getServerSession(authOptions);
    let user : User = {
        name: session!.user?.name!,
        avatar: session!.user?.image!,
        email: session!.user?.email!,
        role: session!.user?.role!
    }

    return(
        <AppLayout>
            <section>
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-4xl dark:text-white">Holdfast Players</h1>
                
                <PlayerTable {...user}/>

            </section>
        </AppLayout>
    )
}
