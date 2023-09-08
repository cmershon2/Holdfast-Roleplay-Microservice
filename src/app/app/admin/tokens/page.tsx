import AppLayout from "@/components/appLayout.component";
import ServerTokenTable from "@/components/serverTokenTable.component";

export default async function Page() {

    return(
        <AppLayout>
            <section>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-4xl dark:text-white">Manage Tokens</h1>
                
                <ServerTokenTable />

            </section>
        </AppLayout>
    )
}
