import { CONTACT_EMAIL, CONTACT_PHONE, FEDERATION_PLACE } from "@entities/contacts";
import { SITE_NAME, SITE_URL } from "@shared/lib/seo";

import type { LegalDocumentMeta, LegalOperator } from "./types";

export const LEGAL_REVISION = "Редакция от 25 августа 2026 года";

export const LEGAL_HREFS = {
    privacyPolicy: "/privacy-policy",
    personalData: "/personal-data-usage-terms",
    cookiePolicy: "/cookie-policy",
} as const;

export const LEGAL_OPERATOR: LegalOperator = {
    operatorName: SITE_NAME,
    operatorNameDative: "Федерации воркаута Забайкальского края",
    address: FEDERATION_PLACE.address,
    email: CONTACT_EMAIL.value,
    emailHref: CONTACT_EMAIL.href,
    phone: CONTACT_PHONE.value,
    phoneHref: CONTACT_PHONE.href,
    siteUrl: SITE_URL,
};

export const LEGAL_DOCUMENTS = [
    {
        slug: "privacy-policy",
        href: LEGAL_HREFS.privacyPolicy,
        title: "Политика конфиденциальности",
        menuTitle: "Политика конфиденциальности",
        description:
            "Политика конфиденциальности Федерации воркаута Забайкальского края: какие данные собираем, зачем обрабатываем и как защищаем.",
    },
    {
        slug: "personal-data-usage-terms",
        href: LEGAL_HREFS.personalData,
        title: "Согласие на обработку персональных данных",
        menuTitle: "Согласие на обработку данных",
        description:
            "Согласие на обработку персональных данных при заявке на тренировку и обращении в Федерацию воркаута Забайкальского края.",
    },
    {
        slug: "cookie-policy",
        href: LEGAL_HREFS.cookiePolicy,
        title: "Политика cookie",
        menuTitle: "Политика cookie",
        description:
            "Как Федерация воркаута Забайкальского края использует файлы cookie и аналогичные технологии на сайте.",
    },
] as const satisfies readonly LegalDocumentMeta[];
