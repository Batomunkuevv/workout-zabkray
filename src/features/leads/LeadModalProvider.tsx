"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { LeadModal } from "./LeadModal";

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
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <LeadModalContext.Provider
            value={{
                isOpen,
                open,
                close,
            }}
        >
            {children}
            <LeadModal isOpen={isOpen} onClose={close} />
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
