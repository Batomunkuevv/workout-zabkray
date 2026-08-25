import { ReactNode } from "react";
import type { LinkProps } from "next/link";

export type ButtonVariant = "primary" | "secondary" | "unstyled";
export type ButtonTone = "light" | "dark";
export type ButtonHoverTone = "red" | "dark";

type BaseProps = {
    children: ReactNode;
    className?: string;

    variant?: ButtonVariant;
    tone?: ButtonTone;
    /** Цвет фона при hover для variant="primary". По умолчанию — красный градиент. */
    hoverTone?: ButtonHoverTone;

    disabled?: boolean;
    isLoading?: boolean;
};

type AsButton = {
    href?: never;
    type?: HTMLButtonElement["type"];
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type AsLink = {
    type?: never;
    href: LinkProps["href"];
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
};

export type ButtonProps = BaseProps & (AsButton | AsLink);