import clsx from "clsx";
import Link from "next/link";

import { ResponsiveImage } from "@shared/ui";

import type { LogoProps } from "./types";

import styles from "./Logo.module.scss";

const LOGO_ALT = "Федерация воркаута Забайкальского края";

export const Logo = ({
    className,
    href = "/",
    priority = true,
    variant = "onDark",
}: LogoProps) => {
    const isOnLight = variant === "onLight";

    return (
        <Link
            href={href}
            className={clsx(styles.root, className)}
            data-variant={variant}
            aria-label="На главную"
        >
            <span className={styles.stack}>
                <ResponsiveImage
                    src="/images/logo-white.svg"
                    alt={isOnLight ? "" : LOGO_ALT}
                    aria-hidden={isOnLight}
                    fit="contain"
                    priority={priority}
                    sizes="160px"
                    className={clsx(styles.layer, styles.layerOnDark)}
                    wrapperClassName={styles.wrapper}
                />
                <ResponsiveImage
                    src="/images/logo.svg"
                    alt={isOnLight ? LOGO_ALT : ""}
                    aria-hidden={!isOnLight}
                    fit="contain"
                    priority={false}
                    sizes="160px"
                    className={clsx(styles.layer, styles.layerOnLight)}
                    wrapperClassName={styles.wrapper}
                />
            </span>
        </Link>
    );
};
