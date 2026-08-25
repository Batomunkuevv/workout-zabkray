import { LEGAL_DOCUMENTS, LEGAL_HREFS, LEGAL_OPERATOR } from "./constants";
import { getCookieSections } from "./content/cookies";
import { getPersonalDataSections } from "./content/personalData";
import { getPrivacySections } from "./content/privacy";
import type {
    LegalContext,
    LegalDocument,
    LegalDocumentSlug,
    LegalRequisite,
} from "./types";

export const getLegalContext = (): LegalContext => {
    return {
        ...LEGAL_OPERATOR,
        privacyHref: LEGAL_HREFS.privacyPolicy,
        personalDataHref: LEGAL_HREFS.personalData,
        cookieHref: LEGAL_HREFS.cookiePolicy,
    };
};

export const getLegalDocumentMeta = (slug: string) => {
    return LEGAL_DOCUMENTS.find((document) => document.slug === slug);
};

export const isLegalDocumentSlug = (slug: string): slug is LegalDocumentSlug => {
    return LEGAL_DOCUMENTS.some((document) => document.slug === slug);
};

export const getLegalDocument = (slug: string): LegalDocument | undefined => {
    const meta = getLegalDocumentMeta(slug);

    if (!meta) {
        return undefined;
    }

    const context = getLegalContext();
    const sectionsBySlug = {
        "privacy-policy": getPrivacySections,
        "personal-data-usage-terms": getPersonalDataSections,
        "cookie-policy": getCookieSections,
    } as const;

    return {
        ...meta,
        sections: sectionsBySlug[meta.slug](context),
    };
};

export const getLegalRequisites = (): readonly LegalRequisite[] => {
    const operator = LEGAL_OPERATOR;

    return [
        { label: "Оператор", value: operator.operatorName },
        { label: "Адрес", value: operator.address },
        { label: "E-mail", value: operator.email, href: operator.emailHref },
        { label: "Телефон", value: operator.phone, href: operator.phoneHref },
        { label: "Сайт", value: operator.siteUrl, href: operator.siteUrl, external: true },
    ];
};
