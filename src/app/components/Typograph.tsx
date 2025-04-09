import { JSX } from "react";
import parse, { DOMNode, domToReact, Element, Text } from "html-react-parser";
import { TypographProps } from "@t/typograph";

const NON_BREAKABLE_WORDS = new Set([
    "без",
    "для",
    "над",
    "под",
    "при",
    "про",
    "через",
    "вокруг",
    "вместо",
    "внутри",
    "впереди",
    "вследствие",
    "между",
    "наподобие",
    "насчёт",
    "или",
    "все",
    "его",
    "свой",
    "свои",
    "поэтому",
    "после",
    "таких",
    "такой",
    "такая",
    "такое",
    "что",
    "что-то",
    "где-то",
    "зачем-то",
    "почему-то",
    "никто",
    "чтобы",
    "почти",
    "только",
    "потом",
    "если",
    "пока",
    "они",
    "она",
    "всем",
    "всех",
    "вся",
    "весь",
    "как",
    "даже",
    "итоге",
    "также",
    "это",
    "этот",
    "эта",
    "этой",
    "этого",
    "того",
    "той",
    "новый",
    "новая",
    "новое",
    "том",
    "тому",
    "мы",
    "их",
]);

function sanitizeText(text: string): string {
    return text.replace(/&nbsp;/g, " ");
}

function insertNonBreakingSpaces(text: string): string {
    const words = text.split(" ");
    const result: string[] = [];

    for (let i = 0; i < words.length; i++) {
        const current = words[i];
        const trimmed = current.trim();
        const base = trimmed.toLowerCase().replace(/[.,;!?]+$/, "");
        const isDash = base === "–" || base === "-";

        const shouldAddNbsp = (NON_BREAKABLE_WORDS.has(base) || base.length < 3) && !isDash;

        const space = shouldAddNbsp ? "\u00A0" : " ";

        result.push(trimmed + space);
    }

    return result.join("").trim();
}

function replaceHyphens(text: string): string {
    return text.replace(/-/g, "\u2011").replace(/ ?\u2014/g, "\u00A0\u2014");
}

function applyTypographyToText(text: string): string {
    return replaceHyphens(insertNonBreakingSpaces(sanitizeText(text)));
}

function renderTypography(text: string): JSX.Element {
    return <>{applyTypographyToText(text)}</>;
}

export const Typograph = ({ html }: TypographProps): JSX.Element => {
    return (
        <>
            {parse(html, {
                replace: (domNode): string | boolean | void | object | Element | null => {
                    if (domNode.type === "text") {
                        return renderTypography((domNode as Text).data);
                    }

                    if (domNode.type === "tag") {
                        const element = domNode as Element;
                        const Tag = element.name as keyof JSX.IntrinsicElements;

                        return (
                            <Tag {...element.attribs}>
                                {domToReact(element.children as DOMNode[], {
                                    replace: (child): string | boolean | void | object | Element | null => {
                                        if (child.type === "text") {
                                            return renderTypography((child as Text).data);
                                        }
                                        return undefined;
                                    },
                                })}
                            </Tag>
                        );
                    }

                    return undefined;
                },
            })}
        </>
    );
};
