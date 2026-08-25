import type { MetadataRoute } from "next";

import { COMPETITIONS } from "@entities/competitions";
import { LEGAL_DOCUMENTS } from "@entities/legal";
import { SITE_URL } from "@shared/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
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
            url: `${SITE_URL}/competitions`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
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

    const competitionRoutes: MetadataRoute.Sitemap = COMPETITIONS.map((competition) => ({
        url: `${SITE_URL}/competitions/${competition.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [...staticRoutes, ...competitionRoutes];
}
