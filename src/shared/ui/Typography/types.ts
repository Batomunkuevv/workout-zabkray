import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

export type TypographyVariant = "h1" | "h2" | "h3" | "body" | "bodyLarge" | "caption";
export type TypographyTone = "default" | "inverse";

type TypographyShared = {
    variant?: TypographyVariant;
    tone?: TypographyTone;
    className?: string;
    /** Игнорируется, если задан `html`. */
    typograph?: boolean;
};

/** Обычный режим: React-узлы; строки типографятся при `typograph !== false`. */
type TypographyWithChildren = TypographyShared & {
    children: ReactNode;
    html?: undefined;
};

/**
 * HTML-строка (доверенный контент из констант / CMS): Typograf + разбор в узлы, как `Typograph` из `@shared/lib`.
 * Не сочетать с `children`.
 */
type TypographyWithHtml = TypographyShared & {
    html: string;
};

export type TypographyContentProps = TypographyWithChildren | TypographyWithHtml;

export type TypographyProps<T extends ElementType> = TypographyContentProps & {
    as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof TypographyContentProps | "as">;