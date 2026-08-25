import parse from "html-react-parser";
import type { ElementType } from "react";
import { Fragment, cloneElement, isValidElement } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";

import { typographHtml } from "@shared/lib";

import type { TypographyVariant, TypographyProps } from "./types";

import styles from "./Typography.module.scss";

const DEFAULT_TAG_BY_VARIANT: Record<TypographyVariant, ElementType> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    body: "p",
    bodyLarge: "p",
    caption: "span",
};

function typographReactNode(node: ReactNode): ReactNode {
    if (node == null || typeof node === "boolean") {
        return node;
    }

    if (typeof node === "string" || typeof node === "number") {
        return typographHtml(String(node));
    }

    if (Array.isArray(node)) {
        return node.map((child, index) => <Fragment key={index}>{typographReactNode(child)}</Fragment>);
    }

    if (isValidElement(node)) {
        const { children: inner } = node.props as { children?: ReactNode };

        if (node.type === Fragment) {
            if (inner == null) {
                return node;
            }
            return <Fragment>{typographReactNode(inner)}</Fragment>;
        }

        if (typeof node.type === "string") {
            if (inner != null) {
                return cloneElement(node, { children: typographReactNode(inner) } as never);
            }
        }

        return node;
    }

    return node;
}

export const Typography = <T extends ElementType = "p">(props: TypographyProps<T>) => {
    const {
        as,
        variant = "body",
        tone = "default",
        className,
        children,
        typograph = true,
        html,
        ...rest
    } = props;

    const Tag = (as ?? DEFAULT_TAG_BY_VARIANT[variant]) as ElementType;

    const hasDangerHtml =
        "dangerouslySetInnerHTML" in rest &&
        (rest as { dangerouslySetInnerHTML?: { __html?: string } }).dangerouslySetInnerHTML != null;

    const content: ReactNode = (() => {
        if (html !== undefined) {
            return parse(typographHtml(html));
        }
        if (hasDangerHtml) {
            return undefined;
        }
        if (typograph) {
            return typographReactNode(children);
        }
        return children;
    })();

    return (
        <Tag {...rest} className={clsx(styles.root, styles[variant], styles[tone], className)}>
            {content}
        </Tag>
    );
};
