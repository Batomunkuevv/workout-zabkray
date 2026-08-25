import { Fragment } from "react";
import Link from "next/link";

import type { LegalInline, LegalLink } from "@entities/legal";

const isExternalHref = (href: string) => {
    return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
};

type LegalInlineTextProps = {
    parts: readonly LegalInline[];
    className?: string;
};

const LegalAnchor = ({ link, className }: { link: LegalLink; className?: string }) => {
    const isExternal = link.external || isExternalHref(link.href);
    const isHttp = link.href.startsWith("http");

    if (isExternal) {
        return (
            <a
                href={link.href}
                className={className}
                target={isHttp ? "_blank" : undefined}
                rel={isHttp ? "noopener noreferrer" : undefined}
            >
                {link.label}
            </a>
        );
    }

    return (
        <Link href={link.href} className={className}>
            {link.label}
        </Link>
    );
};

export const LegalInlineText = ({ parts, className }: LegalInlineTextProps) => {
    return (
        <>
            {parts.map((part, index) => {
                if (typeof part === "string") {
                    return <Fragment key={index}>{part}</Fragment>;
                }

                return <LegalAnchor key={`${part.href}-${index}`} link={part} className={className} />;
            })}
        </>
    );
};
