"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { MENU_ITEMS } from "@entities/navigation";
import { DesktopMenu, MobileMenu } from "@features/navigation";

import { Container, Logo } from "@shared/ui";

import { HeaderActions } from "./HeaderActions";

import styles from "./Header.module.scss";

const MD_BREAKPOINT = 959;
const DESKTOP_SCROLL_THRESHOLD = 64;
const DESKTOP_STICKY_TOP = 24;

const getHeaderInset = (header: HTMLElement) => {
    const inset = parseFloat(getComputedStyle(header).getPropertyValue("--header-inset"));

    return Number.isFinite(inset) ? inset : 24;
};

export const Header = () => {
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleBurgerClick = () => setIsMenuOpen((isOpen) => !isOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        let rafId = 0;

        const update = () => {
            const header = headerRef.current;

            if (!header) return;

            const isMobile = window.innerWidth <= MD_BREAKPOINT;

            if (isMobile) {
                const inset = getHeaderInset(header);
                const offset = Math.max(0, inset - window.scrollY);
                const scrolled = window.scrollY >= inset;

                header.style.removeProperty("--header-top");
                header.style.setProperty("--header-offset", `${offset}px`);
                setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
            } else {
                const inset = getHeaderInset(header);
                const progress = Math.min(window.scrollY / DESKTOP_SCROLL_THRESHOLD, 1);
                const top = inset + (DESKTOP_STICKY_TOP - inset) * progress;
                const scrolled = window.scrollY >= DESKTOP_SCROLL_THRESHOLD;

                header.style.removeProperty("--header-offset");
                header.style.setProperty("--header-top", `${top}px`);
                setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
            }
        };

        const onScroll = () => {
            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                rafId = 0;
                update();
            });
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };

        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [isMenuOpen]);

    return (
        <>
            <header
                ref={headerRef}
                className={clsx(styles.header, {
                    [styles.isScrolled]: isScrolled,
                })}
            >
                <div className={styles.shell}>
                    <div className={styles.fullBleed}>
                        <Container className={styles.container}>
                            <div className={styles.body}>
                                <Logo className={styles.logo} variant={isScrolled ? "onLight" : "onDark"} />
                                <DesktopMenu items={MENU_ITEMS} className={styles.desktopNavigation} />
                                <HeaderActions
                                    onBurgerClick={handleBurgerClick}
                                    isScrolled={isScrolled}
                                    isMenuOpen={isMenuOpen}
                                />
                            </div>
                        </Container>
                    </div>
                </div>
            </header>
            <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} items={MENU_ITEMS} />
        </>
    );
};
