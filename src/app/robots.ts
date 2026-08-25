import type { MetadataRoute } from "next";

import { SITE_URL } from "@shared/lib/seo";

const isNoIndex = process.env.NEXT_PUBLIC_NO_INDEX === "true";

export default function robots(): MetadataRoute.Robots {
    if (isNoIndex) {
        return {
            rules: {
                userAgent: "*",
                disallow: "/",
            },
        };
    }

    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
