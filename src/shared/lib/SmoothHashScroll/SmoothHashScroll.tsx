"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type HashNavigation = {
    pathname: string;
    search: string;
    hash: string;
};

const getScrollBehavior = (): ScrollBehavior => {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches ? "auto" : "smooth";
};

const scrollToHash = (hash: string, behavior: ScrollBehavior = getScrollBehavior()) => {
    const id = decodeURIComponent(hash.replace(/^#/, ""));

    if (!id) {
        return false;
    }

    const target = document.getElementById(id);

    if (!target) {
        return false;
    }

    target.scrollIntoView({ behavior, block: "start" });
    return true;
};

const parseHashNavigation = (href: string): HashNavigation | null => {
    let url: URL;

    try {
        url = new URL(href, window.location.href);
    } catch {
        return null;
    }

    if (url.origin !== window.location.origin) {
        return null;
    }

    const id = decodeURIComponent(url.hash.replace(/^#/, ""));

    if (!id) {
        return null;
    }

    return {
        pathname: url.pathname,
        search: url.search,
        hash: `#${id}`,
    };
};

export const SmoothHashScroll = () => {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!window.location.hash) {
            return;
        }

        const frameId = window.requestAnimationFrame(() => {
            scrollToHash(window.location.hash);
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [pathname]);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0) {
                return;
            }

            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            const anchor = (event.target as Element | null)?.closest("a[href]");

            if (!(anchor instanceof HTMLAnchorElement)) {
                return;
            }

            if (anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) {
                return;
            }

            const navigation = parseHashNavigation(anchor.getAttribute("href") ?? anchor.href);

            if (!navigation) {
                return;
            }

            const isSamePage =
                navigation.pathname === window.location.pathname && navigation.search === window.location.search;

            if (isSamePage) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            router.push(`${navigation.pathname}${navigation.search}${navigation.hash}`, { scroll: false });
        };

        document.addEventListener("click", handleClick, true);

        return () => document.removeEventListener("click", handleClick, true);
    }, [router]);

    return null;
};
