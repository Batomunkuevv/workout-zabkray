"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { DesktopMenuItem } from "./DesktopMenuItem";

import type { DesktopMenuProps } from "./types";

import styles from "./DesktopMenu.module.scss";

export const DesktopMenu = ({ items, className }: DesktopMenuProps) => {
    const pathname = usePathname();
    const rootRef = useRef<HTMLElement>(null);
    const closeTimerRef = useRef<number>(0);
    const [openTitle, setOpenTitle] = useState<string | null>(null);

    const openItem = (title: string) => {
        window.clearTimeout(closeTimerRef.current);
        setOpenTitle(title);
    };

    const closeItem = () => {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = window.setTimeout(() => {
            setOpenTitle(null);
        }, 120);
    };

    const closeNow = () => {
        window.clearTimeout(closeTimerRef.current);
        setOpenTitle(null);
    };

    useEffect(() => {
        closeNow();
    }, [pathname]);

    useEffect(() => {
        if (!openTitle) return;

        const handlePointerDown = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                closeNow();
            }
        };

        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeNow();
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        window.addEventListener("keydown", handleKeydown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [openTitle]);

    useEffect(() => {
        return () => window.clearTimeout(closeTimerRef.current);
    }, []);

    return (
        <nav ref={rootRef} className={clsx(styles.navigation, className)} aria-label="Основная навигация">
            <ul className={styles.list}>
                {items.map((item) => (
                    <DesktopMenuItem
                        key={item.title}
                        item={item}
                        isOpen={openTitle === item.title}
                        onOpen={() => openItem(item.title)}
                        onClose={closeItem}
                    />
                ))}
            </ul>
        </nav>
    );
};
