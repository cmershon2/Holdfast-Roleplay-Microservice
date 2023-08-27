import AppLayout from "@/components/appLayout.component";
import UserTable from "@/components/userTable.component";

export default async function Users() {
    return(
        <AppLayout>
            <section>
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Manage Users</h1>
                <hr className="mb-14"></hr>
                
            </section>
        </AppLayout>
    )
}