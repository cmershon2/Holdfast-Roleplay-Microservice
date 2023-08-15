import AppLayout from "@/components/appLayout.component";

export default async function Dashboard() {
    return(
        <AppLayout>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Manage Users</h1>
            </div>
        </AppLayout>
    )
}