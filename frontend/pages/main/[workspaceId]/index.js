export const dynamic = 'force-dynamic';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import React from "react";

const WorkspaceIdPage = () => {
    const { data: session } = useSession({ required: true });
    const router = useRouter();
    const { workspaceId } = router.query;
    return (
        <main className="flex overflow-hidden h-screen w-screen">
            <div className="dark:border-Neutrals-12/70 border-l-[1px] w-full relative overflow-scroll">
                <div className="relative">
                    quileditor {workspaceId}
                </div>
            </div>
        </main>
    )
}


export default WorkspaceIdPage;