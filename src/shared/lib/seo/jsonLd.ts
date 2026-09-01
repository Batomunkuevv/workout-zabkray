import {
    CONTACT_EMAIL,
    CONTACT_PHONE,
    FEDERATION_PLACE,
    type FederationPlace,
} from "@entities/contacts";
import { SOCIAL_LINKS } from "@entities/social";
import {
    TRAINERS,
    TRAINERS_HREF,
    getTrainerHref,
    splitTrainerName,
    type Trainer,
} from "@entities/trainers";

import { SITE_DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

const POSTAL_ADDRESS = {
    "@type": "PostalAddress",
    streetAddress: "улица Ленина, 1, 2 этаж",
    addressLocality: "Чита",
    addressRegion: "Забайкальский край",
    addressCountry: "RU",
} as const;

const toAbsoluteUrl = (path: string) => {
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    return new URL(path, SITE_URL).toString();
};

const getSocialSameAs = () => {
    return SOCIAL_LINKS.map((link) => link.url).filter((url) => url.startsWith("http"));
};

export const getOrganizationJsonLd = () => {
    const sameAs = getSocialSameAs();

    return {
        "@context": "https://schema.org",
        "@type": "SportsOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "Воркаут Забайкальского края",
        url: SITE_URL,
        logo: toAbsoluteUrl("/images/logo.svg"),
        description: SITE_DEFAULT_DESCRIPTION,
        email: CONTACT_EMAIL.value,
        telephone: CONTACT_PHONE.href.replace("tel:", ""),
        address: POSTAL_ADDRESS,
        ...(sameAs.length > 0 ? { sameAs } : {}),
    };
};

export const getLocalBusinessJsonLd = (place: FederationPlace = FEDERATION_PLACE) => {
    return {
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        "@id": `${SITE_URL}/contacts#place`,
        name: place.title,
        url: `${SITE_URL}/contacts`,
        description: SITE_DEFAULT_DESCRIPTION,
        image: toAbsoluteUrl("/images/logo.svg"),
        telephone: CONTACT_PHONE.href.replace("tel:", ""),
        email: CONTACT_EMAIL.value,
        address: POSTAL_ADDRESS,
        geo: {
            "@type": "GeoCoordinates",
            latitude: place.coordinates.lat,
            longitude: place.coordinates.lon,
        },
        parentOrganization: {
            "@id": `${SITE_URL}/#organization`,
        },
    };
};

export type BreadcrumbJsonLdItem = {
    name: string;
    path: string;
};

export const getBreadcrumbJsonLd = (items: readonly BreadcrumbJsonLdItem[], id?: string) => {
    return {
        "@type": "BreadcrumbList",
        ...(id ? { "@id": id } : {}),
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: toAbsoluteUrl(item.path),
        })),
    };
};

const getTrainerPersonJsonLd = (trainer: Trainer, url: string) => {
    const { givenName, familyName } = splitTrainerName(trainer.name);
    const sameAs = trainer.socials.map((link) => link.url).filter((href) => href.startsWith("http"));

    return {
        "@type": "Person",
        "@id": `${url}#person`,
        name: trainer.name,
        givenName,
        familyName,
        url,
        image: toAbsoluteUrl(trainer.image),
        jobTitle: trainer.role,
        description: trainer.seo.description,
        worksFor: { "@id": `${SITE_URL}/#organization` },
        memberOf: { "@id": `${SITE_URL}/#organization` },
        workLocation: { "@id": `${SITE_URL}/contacts#place` },
        address: POSTAL_ADDRESS,
        hasOccupation: {
            "@type": "Occupation",
            name: trainer.role,
            occupationLocation: {
                "@type": "City",
                name: "Чита",
                containedInPlace: {
                    "@type": "AdministrativeArea",
                    name: "Забайкальский край",
                },
            },
        },
        knowsAbout: ["воркаут", "workout", "street workout"],
        ...(trainer.phone ? { telephone: trainer.phone.href.replace("tel:", "") } : {}),
        ...(sameAs.length > 0 ? { sameAs } : {}),
    };
};

export const getTrainerPageJsonLd = (trainer: Trainer) => {
    const path = getTrainerHref(trainer.id);
    const url = toAbsoluteUrl(path);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${url}#webpage`,
                url,
                name: trainer.seo.title,
                description: trainer.seo.description,
                inLanguage: "ru-RU",
                isPartOf: {
                    "@type": "WebSite",
                    name: SITE_NAME,
                    url: SITE_URL,
                    publisher: { "@id": `${SITE_URL}/#organization` },
                },
                about: { "@id": `${url}#person` },
                mainEntity: { "@id": `${url}#person` },
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: toAbsoluteUrl(trainer.image),
                },
                breadcrumb: { "@id": `${url}#breadcrumb` },
            },
            getTrainerPersonJsonLd(trainer, url),
            getBreadcrumbJsonLd(
                [
                    { name: "Главная", path: "/" },
                    { name: "Тренеры", path: TRAINERS_HREF },
                    { name: trainer.name, path },
                ],
                `${url}#breadcrumb`,
            ),
        ],
    };
};

export const getTrainersListJsonLd = () => {
    const url = toAbsoluteUrl(TRAINERS_HREF);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": `${url}#webpage`,
                url,
                name: "Тренеры по воркауту в Чите",
                description:
                    "Тренеры Федерации воркаута Забайкальского края в Чите. Расписание, опыт и запись на тренировки в зале на Ленина, 1.",
                inLanguage: "ru-RU",
                isPartOf: {
                    "@type": "WebSite",
                    name: SITE_NAME,
                    url: SITE_URL,
                    publisher: { "@id": `${SITE_URL}/#organization` },
                },
                about: { "@id": `${SITE_URL}/#organization` },
                mainEntity: { "@id": `${url}#list` },
                breadcrumb: { "@id": `${url}#breadcrumb` },
            },
            {
                "@type": "ItemList",
                "@id": `${url}#list`,
                name: "Тренеры Федерации воркаута Забайкальского края",
                itemListOrder: "https://schema.org/ItemListOrderAscending",
                numberOfItems: TRAINERS.length,
                itemListElement: TRAINERS.map((trainer, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    url: toAbsoluteUrl(getTrainerHref(trainer.id)),
                    name: trainer.name,
                })),
            },
            getBreadcrumbJsonLd(
                [
                    { name: "Главная", path: "/" },
                    { name: "Тренеры", path: TRAINERS_HREF },
                ],
                `${url}#breadcrumb`,
            ),
        ],
    };
};
