import clsx from "clsx";
import Link from "next/link";

import { Typography } from "@shared/ui/Typography";

import type { BreadcrumbsProps } from "./types";

import styles from "./Breadcrumbs.module.scss";

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
    if (items.length === 0) {
        return null;
    }

    return (
        <nav className={clsx(styles.nav, className)} aria-label="Навигация по сайту">
            <ol className={styles.list}>
                {items.map((item, index) => {
                    const isCurrent = index === items.length - 1 || !item.href;

                    return (
                        <li key={`${item.label}-${index}`} className={styles.item}>
                            {isCurrent ? (
                                <Typography as="span" className={styles.current} aria-current="page">
                                    {item.label}
                                </Typography>
                            ) : (
                                <Link href={item.href!} className={styles.link}>
                                    <Typography as="span" className={styles.linkText}>
                                        {item.label}
                                    </Typography>
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
