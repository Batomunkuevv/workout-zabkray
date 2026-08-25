"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { isMenuGroup, type MenuItem } from "@entities/navigation";
import { SOCIAL_LINKS } from "@entities/social";

import { Burger, SocialLinks, Typography } from "@shared/ui";

import type { MobileMenuProps } from "./types";

import styles from "./MobileMenu.module.scss";

export const MobileMenu = ({ items, isOpen, onClose }: MobileMenuProps) => {
    const pathname = usePathname();
    const [openTitle, setOpenTitle] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setOpenTitle(null);
        }
    }, [isOpen]);

    const toggleGroup = (title: string) => {
        setOpenTitle((current) => (current === title ? null : title));
    };

    return (
        <>
            <button
                type="button"
                className={styles.backdrop}
                data-open={isOpen}
                aria-label="Закрыть меню"
                tabIndex={isOpen ? 0 : -1}
                onClick={onClose}
            />
            <div
                className={styles.panel}
                data-open={isOpen}
                role="dialog"
                aria-modal="true"
                aria-label="Мобильное меню"
                aria-hidden={!isOpen}
            >
                <div className={styles.panelHeader}>
                    <Burger variant="close" tone="dark" onClick={onClose} className={styles.closeButton} />
                </div>
                <nav className={styles.nav} aria-label="Мобильная навигация">
                    <ul className={styles.menuList}>
                        {items.map((item) => (
                            <MobileMenuItem
                                key={item.title}
                                item={item}
                                pathname={pathname}
                                isGroupOpen={openTitle === item.title}
                                onToggleGroup={() => toggleGroup(item.title)}
                                onClose={onClose}
                            />
                        ))}
                    </ul>
                </nav>
                <SocialLinks links={SOCIAL_LINKS} surface="onLight" className={styles.socials} />
            </div>
        </>
    );
};

type MobileMenuItemProps = {
    item: MenuItem;
    pathname: string;
    isGroupOpen: boolean;
    onToggleGroup: () => void;
    onClose: () => void;
};

const MobileMenuItem = ({ item, pathname, isGroupOpen, onToggleGroup, onClose }: MobileMenuItemProps) => {
    if (!isMenuGroup(item)) {
        const isCurrent = item.href !== "#" && pathname === item.href;

        return (
            <li className={styles.menuItem}>
                <Link
                    href={item.href}
                    className={styles.menuLink}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={onClose}
                >
                    <Typography as="span" variant="bodyLarge">
                        {item.title}
                    </Typography>
                </Link>
            </li>
        );
    }

    return (
        <li className={styles.menuItem} data-open={isGroupOpen}>
            <button
                type="button"
                className={styles.groupToggle}
                aria-expanded={isGroupOpen}
                onClick={onToggleGroup}
            >
                <Typography as="span" variant="bodyLarge">
                    {item.title}
                </Typography>
                <span className={styles.chevron} aria-hidden="true" />
            </button>
            <div className={styles.submenu} data-open={isGroupOpen}>
                <div className={styles.submenuCollapse}>
                    <ul className={styles.submenuList}>
                        {item.children.map((child) => (
                            <li key={child.title}>
                                <Link href={child.href} className={styles.submenuLink} onClick={onClose}>
                                    <Typography as="span">{child.title}</Typography>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
};
