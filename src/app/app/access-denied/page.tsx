import AppLayout from "@/components/appLayout.component";
import { AccessDeniedStatusScreen } from "@/components/statusMessages.component";

export default async function Page() {

    return (
        <AppLayout>
            <div className="">
                <AccessDeniedStatusScreen title="Access Denied" message="You do not have access to this resource. If you believe you should, kindly contact an admin user."/>
            </div>
        </AppLayout>
    )
}