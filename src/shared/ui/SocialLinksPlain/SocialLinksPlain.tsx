import clsx from "clsx";

import { Icon } from "@shared/ui";

import type { SocialLinksPlainProps } from "./types";

import styles from "./SocialLinksPlain.module.scss";

export const SocialLinksPlain = ({ links, className, ariaLabel = "Социальные сети" }: SocialLinksPlainProps) => {
    if (links.length === 0) {
        return null;
    }

    return (
        <nav className={clsx(styles.socials, className)} aria-label={ariaLabel}>
            <ul className={styles.list}>
                {links.map((link) => (
                    <li key={`${link.type}-${link.url}`}>
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
