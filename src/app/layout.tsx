import { ReactNode } from "react";
import localFont from "next/font/local";
import clsx from "clsx";

import "./globals.css";

import type { Metadata } from "next";

import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/footer";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const heliosExt = localFont({
    src: [
        {
            path: "/fonts/HeliosExt.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "/fonts/HeliosExt.woff",
            weight: "400",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-helios",
});
const benzin = localFont({
    src: [
        {
            path: "/fonts/Benzin-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "/fonts/Benzin-Medium.woff",
            weight: "500",
            style: "normal",
        },
        {
            path: "/fonts/Benzin-Semibold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "/fonts/Benzin-Semibold.woff",
            weight: "600",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-benzin",
});

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="ru">
            <head>
                <meta name="robots" content="noindex, nofollow" />
            </head>
            <body className={clsx(heliosExt.variable, benzin.variable)}>
                <div className="flex flex-col overflow-clip">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
