import type { LinkProps } from "next/link";
import type { MouseEventHandler } from "react";

export type CtaButtonSize = "md" | "sm";

type CtaButtonShared = {
    /** Первая строка текста */
    line1?: string;
    /** Вторая строка (если не нужна — не передавай или пустая строка) */
    line2?: string;
    /** md — макет Figma 488×146, sm — пропорционально меньше */
    size?: CtaButtonSize;
    /** На всю ширину: углы по краям, текст и blob по центру */
    fullWidth?: boolean;
    /** Широкая рамка на всю строку (планшет), контент компактно по центру */
    wideFrame?: boolean;
    className?: string;
};

type CtaButtonAsLink = CtaButtonShared & {
    href: LinkProps["href"];
    onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type CtaButtonAsButton = CtaButtonShared & {
    href?: undefined;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

export type CtaButtonProps = CtaButtonAsLink | CtaButtonAsButton;
