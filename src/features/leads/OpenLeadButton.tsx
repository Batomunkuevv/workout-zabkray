"use client";

import { Button } from "@shared/ui";
import type { ButtonProps } from "@shared/ui";

import { useLeadModal } from "./LeadModalProvider";

type OpenLeadButtonProps = Omit<Extract<ButtonProps, { href?: never }>, "onClick" | "type"> & {
    type?: "button";
};

export const OpenLeadButton = ({ children, ...props }: OpenLeadButtonProps) => {
    const { open } = useLeadModal();

    return (
        <Button {...props} type="button" onClick={open}>
            {children}
        </Button>
    );
};
