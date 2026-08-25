import type { HTMLAttributes, ReactNode } from "react";

export type SectionTagOrientation = "vertical" | "horizontal";

export type SectionTagProps = {
    children: ReactNode;
    orientation?: SectionTagOrientation;
} & HTMLAttributes<HTMLSpanElement>;
