import type { ImageProps } from "next/image";
import type { LinkProps } from "next/link";

type BaseProps = {
    className?: string;
    wrapperClassName?: string;
    fit?: "cover" | "contain";
} & Omit<ImageProps, "fill" | "style"> & {
    sizes: string;
};

type AsLink = {
    href: LinkProps["href"];
    prefetch?: LinkProps["prefetch"];
    replace?: LinkProps["replace"];
    scroll?: LinkProps["scroll"];
    shallow?: LinkProps["shallow"];
    locale?: LinkProps["locale"];
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
};

type AsBlock = {
    href?: never;
};

export type ResponsiveImageProps = BaseProps & (AsLink | AsBlock);