import clsx from "clsx";

import { SECTION_STACK_OFFSET_CLASS } from "@shared/styles/classes";

import type { SectionStackProps } from "./types";

export const SectionStack = ({ children, className, offset = "none" }: SectionStackProps) => {
    return (
        <div className={clsx("section-stack", offset === "header" && SECTION_STACK_OFFSET_CLASS, className)}>
            {children}
        </div>
    );
};
