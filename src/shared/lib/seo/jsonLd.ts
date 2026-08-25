import {
    CONTACT_EMAIL,
    CONTACT_PHONE,
    FEDERATION_PLACE,
    type FederationPlace,
} from "@entities/contacts";
import { SOCIAL_LINKS } from "@entities/social";
import type { Competition } from "@entities/competitions";

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

const stripHtml = (value: string) => {
    return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
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

export const getCompetitionEventJsonLd = (competition: Competition) => {
    return {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        "@id": `${SITE_URL}/competitions/${competition.slug}#event`,
        name: stripHtml(competition.title),
        description: competition.seoDescription ?? competition.description,
        url: `${SITE_URL}/competitions/${competition.slug}`,
        image: toAbsoluteUrl(competition.image),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place",
            name: FEDERATION_PLACE.title,
            address: POSTAL_ADDRESS,
            geo: {
                "@type": "GeoCoordinates",
                latitude: FEDERATION_PLACE.coordinates.lat,
                longitude: FEDERATION_PLACE.coordinates.lon,
            },
        },
        organizer: {
            "@id": `${SITE_URL}/#organization`,
        },
    };
};
