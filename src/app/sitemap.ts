import type { MetadataRoute } from "next";

import { LEGAL_DOCUMENTS } from "@entities/legal";
import { TRAINERS, TRAINERS_HREF, getTrainerHref } from "@entities/trainers";
import { SITE_URL } from "@shared/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/athletes`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}${TRAINERS_HREF}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        ...TRAINERS.map((trainer) => ({
            url: `${SITE_URL}${getTrainerHref(trainer.id)}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        {
            url: `${SITE_URL}/contacts`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.7,
        },
        ...LEGAL_DOCUMENTS.map((document) => ({
            url: `${SITE_URL}${document.href}`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.3,
        })),
    ];
}
