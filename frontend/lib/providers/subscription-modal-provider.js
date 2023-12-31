'use client'
import { useState, createContext, useContext } 
from "react";
import SubscriptionModal from "@/components/global/subscription-modal";


const SubscriptionModalContext = createContext({
    open: false,
    setOpen: () => {}
});


export const useSubscriptionModal = () => {
    return useContext(SubscriptionModalContext);
};

export const SubscriptionModalProvider = ({ children, products }) => {
    const [open, setOpen] = useState(false);

    return (
        <SubscriptionModalContext.Provider value={{ open, setOpen }}>
            {children}
            <SubscriptionModal products={products} />
        </SubscriptionModalContext.Provider>
    )
};
