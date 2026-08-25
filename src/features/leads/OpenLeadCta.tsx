"use client";

import { CtaButton } from "@shared/ui";
import type { CtaButtonProps } from "@shared/ui";

import { useLeadModal } from "./LeadModalProvider";

type OpenLeadCtaProps = Omit<CtaButtonProps, "href" | "onClick">;

export const OpenLeadCta = (props: OpenLeadCtaProps) => {
    const { open } = useLeadModal();

    return <CtaButton {...props} onClick={open} />;
};
