"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { LeadModal } from "./LeadModal";
import { LeadSuccessModal } from "./LeadSuccessModal";

type LeadModalContextValue = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

type LeadModalProviderProps = {
    children: ReactNode;
};

export const LeadModalProvider = ({ children }: LeadModalProviderProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const open = () => {
        setIsSuccessOpen(false);
        setIsFormOpen(true);
    };

    const close = () => {
        setIsFormOpen(false);
        setIsSuccessOpen(false);
    };

    const handleSuccess = () => {
        setIsFormOpen(false);
        setIsSuccessOpen(true);
    };

    return (
        <LeadModalContext.Provider
            value={{
                isOpen: isFormOpen || isSuccessOpen,
                open,
                close,
            }}
        >
            {children}
            <LeadModal isOpen={isFormOpen} onClose={close} onSuccess={handleSuccess} />
            <LeadSuccessModal isOpen={isSuccessOpen} onClose={close} />
        </LeadModalContext.Provider>
    );
};

export const useLeadModal = () => {
    const context = useContext(LeadModalContext);

    if (!context) {
        throw new Error("useLeadModal must be used within LeadModalProvider");
    }

    return context;
};
