import type { LinkProps } from "next/link";

export type LogoVariant = "onDark" | "onLight";

export interface LogoProps {
    href?: LinkProps["href"];
    className?: string;
    priority?: boolean;
    variant?: LogoVariant;
}