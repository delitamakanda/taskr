import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';
import { redirect } from 'next/navigation';
import { getUserSubscriptionStatus, getWorkspaces } from "@/lib/queries";
import { SubscriptionModalProvider } from "@/lib/providers/subscription-modal-provider";

const DashboardPage = () =>{
    const { data: session } = useSession({ required: true });
    const [subscription, setSubscription] = useState(null);
    const [workspace, setWorkspace] = useState(null);

    // console.log(session)

    useEffect( () => {
        async function fetchSubscription() {
            const { data: subscription } = await getUserSubscriptionStatus(session);
            setSubscription(subscription[0]);
        }

        async function fetchWorkspace() {
            const { data: workspaces } = await getWorkspaces(session);
            setWorkspace(workspaces[0]);
        }
        fetchSubscription()
        fetchWorkspace()
    }, [])

    if (!workspace) {

        return (
            <main className="flex over-hidden h-screen">
            <SubscriptionModalProvider products={[]}>
                <div className="bg-background
        h-screen
        w-screen
        flex
        justify-center
        items-center">
            <DashboardSetup user={session?.user} subscription={subscription} />
            </div>
            </SubscriptionModalProvider>
        </main>
    );
    }
    redirect(`/main/${workspace.id}/`)
}


export default DashboardPage;
