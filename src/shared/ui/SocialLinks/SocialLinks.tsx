"use client";

import clsx from "clsx";
import { MouseEvent } from "react";

import { Icon } from "@shared/ui";

import type { SocialLinksProps } from "./types";

import styles from "./SocialLinks.module.scss";

export const SocialLinks = ({ links, className, surface = "onDark" }: SocialLinksProps) => {
    const handleMouseEnter = (e: MouseEvent<HTMLLIElement>) => {
        const { currentTarget } = e;
        const parent = currentTarget.parentElement;

        if (!parent) return;

        const items = [...parent.children] as HTMLLIElement[];
        const index = items.indexOf(currentTarget);
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        items.forEach((item, i) => {
            item.classList.toggle(styles.hovered, i === index);
            item.classList.toggle(styles.isPrev, i < index && !isLast);
            item.classList.toggle(styles.isNext, i > index && !isFirst);
        });
    };

    const handleMouseLeave = (e: MouseEvent<HTMLLIElement>) => {
        const { currentTarget } = e;
        const parent = currentTarget.parentElement;

        if (!parent) return;

        const items = [...parent.children] as HTMLLIElement[];

        items.forEach((item) => {
            item.classList.remove(styles.hovered, styles.isPrev, styles.isNext);
        });
    };

    return (
        <nav
            className={clsx(styles.socials, styles[`socials--${surface}`], className)}
            aria-label="Социальные сети"
        >
            <ul className={styles.list}>
                {links.map((link) => (
                    <li
                        key={`${link.type}-${link.url}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={styles.item}
                    >
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                            aria-label={link.label}
                        >
                            <Icon name={link.type} className={styles.icon} />
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
