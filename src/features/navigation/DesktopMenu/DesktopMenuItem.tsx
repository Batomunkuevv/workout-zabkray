"use client";

import { useId, type PointerEvent } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { isMenuGroup, type MenuItem } from "@entities/navigation";
import { Typography } from "@shared/ui";

import styles from "./DesktopMenu.module.scss";

type DesktopMenuItemProps = {
    item: MenuItem;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const DesktopMenuItem = ({ item, isOpen, onOpen, onClose }: DesktopMenuItemProps) => {
    const pathname = usePathname();
    const dropdownId = useId();
    const group = isMenuGroup(item);

    const isCurrent = !group && item.href !== "#" && pathname === item.href;

    const handlePointerEnter = (event: PointerEvent<HTMLLIElement>) => {
        if (event.pointerType === "mouse") {
            onOpen();
        }
    };

    const handlePointerLeave = (event: PointerEvent<HTMLLIElement>) => {
        if (event.pointerType === "mouse") {
            onClose();
        }
    };

    if (!group) {
        return (
            <li className={styles.item}>
                <Link
                    href={item.href}
                    className={clsx(styles.trigger, styles.triggerLink)}
                    aria-current={isCurrent ? "page" : undefined}
                >
                    {item.title}
                </Link>
            </li>
        );
    }

    return (
        <li
            className={styles.item}
            data-open={isOpen}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={dropdownId}
                onClick={() => (isOpen ? onClose() : onOpen())}
            >
                {item.title}
                <span className={styles.chevron} aria-hidden="true" />
            </button>

            <div className={styles.dropdown} id={dropdownId} aria-hidden={!isOpen}>
                <ul className={styles.dropdownList}>
                    {item.children.map((child) => (
                        <li key={child.title}>
                            <Link href={child.href} className={styles.dropdownLink} onClick={onClose} tabIndex={isOpen ? 0 : -1}>
                                <Typography as="span" className={styles.dropdownTitle}>
                                    {child.title}
                                </Typography>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
};
