import AppLayout from "@/components/appLayout.component";
import ServerTable from "@/components/serverTable.component";

export default async function Page() {

    return(
        <AppLayout>
            <section>
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-4xl dark:text-white">Manage Server Instances</h1>
                
                <ServerTable />

            </section>
        </AppLayout>
    )
}
