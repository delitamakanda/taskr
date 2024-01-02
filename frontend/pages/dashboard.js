import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router'
import { getUserSubscriptionStatus, getWorkspaces } from "@/lib/queries";
import { SubscriptionModalProvider } from "@/lib/providers/subscription-modal-provider";

const DashboardPage = () =>{
    const [subscription, setSubscription] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);
    const { data: session } = useSession({ required: true });
    const router = useRouter();
    if (workspaces && workspaces.length > 0) {
        console.log('workspaces', workspaces[0]);
        router.push(`/main/${workspaces[0].id}/`)
    }
    
    useEffect(() => {
        async function fetchData() {
            const { data: subs } = await getUserSubscriptionStatus(session.access_token);
            if (subs && subs.length > 0) {
                setSubscription(subs);
            }
            const { data: wk } = await getWorkspaces(session.access_token);
            if (wk && wk.length > 0) {
                setWorkspaces(wk);
            }
        }
        fetchData()
    }, [])

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
    )
}


export default DashboardPage;
