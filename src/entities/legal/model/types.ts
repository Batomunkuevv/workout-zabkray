export type LegalDocumentSlug = "privacy-policy" | "personal-data-usage-terms" | "cookie-policy";

export type LegalLink = {
    href: string;
    label: string;
    external?: boolean;
};

export type LegalInline = string | LegalLink;

export type LegalParagraph = {
    type: "p";
    children: readonly LegalInline[];
};

export type LegalList = {
    type: "ul";
    items: readonly (readonly LegalInline[])[];
};

export type LegalBlock = LegalParagraph | LegalList;

export type LegalSection = {
    title: string;
    blocks: readonly LegalBlock[];
};

export type LegalDocumentMeta = {
    slug: LegalDocumentSlug;
    href: `/${LegalDocumentSlug}`;
    title: string;
    menuTitle: string;
    description: string;
};

export type LegalOperator = {
    operatorName: string;
    operatorNameDative: string;
    address: string;
    email: string;
    emailHref: string;
    phone: string;
    phoneHref: string;
    siteUrl: string;
};

export type LegalRequisite = {
    label: string;
    value: string;
    href?: string;
    external?: boolean;
};

export type LegalContext = LegalOperator & {
    privacyHref: LegalDocumentMeta["href"];
    personalDataHref: LegalDocumentMeta["href"];
    cookieHref: LegalDocumentMeta["href"];
};

export type LegalDocument = LegalDocumentMeta & {
    sections: readonly LegalSection[];
};
