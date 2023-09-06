import AppLayout from "@/components/appLayout.component";
import ServerTokenTable from "@/components/serverTable.component";

export default async function Page() {

    return(
        <AppLayout>
            <section>
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Manage Tokens</h1>
                <hr className="mb-14"></hr>
                
                <ServerTokenTable />

            </section>
        </AppLayout>
    )
}
