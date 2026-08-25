import type { Metadata } from "next";
import localFont from "next/font/local";
import clsx from "clsx";

import "./globals.scss";

import type { LayoutProps } from "@shared/types";
import {
    getOrganizationJsonLd,
    SITE_DEFAULT_DESCRIPTION,
    SITE_DEFAULT_TITLE,
    SITE_MANIFEST,
    SITE_NAME,
    SITE_OG_IMAGE,
    SITE_URL,
} from "@shared/lib/seo";
import { JsonLd, StreetCursor } from "@shared/ui";

import { MainLayout } from "@layout/MainLayout";

const isNoIndex = process.env.NEXT_PUBLIC_NO_INDEX === "true";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_DEFAULT_TITLE,
        template: "%s",
    },
    description: SITE_DEFAULT_DESCRIPTION,
    manifest: SITE_MANIFEST,
    icons: {
        icon: [
            {
                url: "/favicon/favicon.ico",
                sizes: "48x48",
            },
            {
                url: "/favicon/favicon-96x96.png",
                sizes: "96x96",
                type: "image/png",
            },
            {
                url: "/favicon/favicon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/favicon/apple-touch-icon.png",
    },
    robots: isNoIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
        type: "website",
        locale: "ru_RU",
        url: SITE_URL,
        siteName: SITE_NAME,
        title: SITE_DEFAULT_TITLE,
        description: SITE_DEFAULT_DESCRIPTION,
        images: [SITE_OG_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_DEFAULT_TITLE,
        description: SITE_DEFAULT_DESCRIPTION,
        images: [SITE_OG_IMAGE.url],
    },
};

const heliosExt = localFont({
    src: [
        {
            path: "../shared/assets/fonts/HeliosExt.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../shared/assets/fonts/HeliosExt.woff",
            weight: "400",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-base",
});

const benzin = localFont({
    src: [
        {
            path: "../shared/assets/fonts/Benzin-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../shared/assets/fonts/Benzin-Medium.woff",
            weight: "500",
            style: "normal",
        },
        {
            path: "../shared/assets/fonts/Benzin-Semibold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../shared/assets/fonts/Benzin-Semibold.woff",
            weight: "600",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-accent",
});

const RootLayout = ({ children }: LayoutProps) => {
    return (
        <html lang="ru">
            <body className={clsx(heliosExt.variable, benzin.variable)}>
                <JsonLd data={getOrganizationJsonLd()} />
                <StreetCursor />
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    );
};

export default RootLayout;
