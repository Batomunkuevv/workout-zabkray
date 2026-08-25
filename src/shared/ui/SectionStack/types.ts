import type { ReactNode } from "react";

export type SectionStackOffset = "none" | "header";

export type SectionStackProps = {
    children: ReactNode;
    className?: string;
    /** Страница без hero: отступ сверху под фиксированный хедер. */
    offset?: SectionStackOffset;
};
