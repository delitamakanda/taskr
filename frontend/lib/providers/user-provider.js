'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from "next-auth/react";
import axios from "axios";
import { getUserSubscriptionStatus } from '@/lib/queries';


const UserContext = createContext({
    user: null,
    subscription: null,
});


export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
    const { toast } = useToast();
    const [user, setUser] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const { data: session } = useSession({ required: true });

    useEffect(() => {
        if (session) {
            fetchUser();
        }
    }, [toast])

    const fetchUser = async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: process.env.NEXT_PUBLIC_BACKEND_URL + 'auth/me/',
                headers: { Authorization: `Bearer ${session?.access_token}` }
            })
            setUser(JSON.stringify(res.data));
            console.log(res);
            const { data, error } = await getUserSubscriptionStatus(res.data.id);
            if (data) {
                setSubscription(data);
            }
            if (error) {
                toast({
                    title: 'error',
                    description: error.message
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <UserContext.Provider value={{ user, subscription }}>
            {children}
        </UserContext.Provider>
    )
}
