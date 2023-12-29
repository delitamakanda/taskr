import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

export default function DashboardPage() {
    const { data: session, status } = useSession({ required: true });
    const [user, setUser] = useState(null);

    const getUserDetails = async (useToken) => {
        try {
            const res = await axios({
                method: 'GET',
                url: process.env.NEXT_PUBLIC_BACKEND_URL + 'auth/me/',
                headers: useToken? { Authorization: `Bearer ${session?.access_token}` } : {}
            })
            setUser(JSON.stringify(res.data));
            console.log(res);
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    if (status === 'loading') return <div>Loading...</div>;
    console.log(session);
    console.log(status);
    if (session) {
        return (
            <div>
                <h1>Hello {session.user.username}</h1>
                <p>#{session.user.pk}</p>
                <>{session.user.email}</>
                <button onClick={() => signOut()}>Sign Out</button>
                <button onClick={() => getUserDetails(true)}>User details (with token)</button>
                <button onClick={() => getUserDetails(false)}>User details (with no token)</button>
            </div>
        )
    }
    return (
        <>
        </>
    );
}