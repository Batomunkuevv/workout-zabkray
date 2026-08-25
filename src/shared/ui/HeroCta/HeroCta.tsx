import Link from "next/link";
import clsx from "clsx";

import { Corners, Icon } from "@shared/ui";

import type { HeroCtaProps } from "./types";

import styles from "./HeroCta.module.scss";

export const HeroCta = ({ href, label = "Записаться\nна тренировки", className }: HeroCtaProps) => {
    const lines = label.split("\n");

    return (
        <Link href={href} className={clsx(styles.root, className)}>
            <Corners className={styles.corners} />

            <span className={styles.label}>
                {lines.map((line, i) => (
                    <span key={i} className={styles.line}>
                        {line}
                    </span>
                ))}
            </span>

            <span className={styles.blobs} aria-hidden="true">
                <span className={styles.blobBack} />
                <span className={styles.blobFront} />
                <span className={styles.arrow}>
                    <Icon name="arrowUpRight" />
                </span>
            </span>
        </Link>
    );
};
