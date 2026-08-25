"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./StreetCursor.module.scss";

type CursorTone = "red" | "black";
type CursorMode = "default" | "interactive";

const INTERACTIVE_QUERY =
    "a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [role='button'], [data-cursor='interactive']";

const TARGET_FRAME_MS = 1000 / 60;
const MAGNET_STRENGTH = 0.28;
const FOLLOW_STRENGTH = 0.32;
const TONE_CHECK_INTERVAL = 120;

const CURSOR_COLORS: Record<CursorTone, string> = {
    red: "#e80000",
    black: "#0e0b0b",
};

const parseColor = (value: string): [number, number, number, number] | null => {
    const match = value.match(/rgba?\(([^)]+)\)/);

    if (!match) {
        return null;
    }

    const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
    const [r, g, b, a = 1] = parts;

    if ([r, g, b].some((channel) => Number.isNaN(channel))) {
        return null;
    }

    return [r, g, b, a];
};

const getLuminance = (r: number, g: number, b: number): number =>
    (0.299 * r + 0.587 * g + 0.114 * b) / 255;

const isRedBackground = ([r, g, b]: [number, number, number, number]): boolean =>
    r > 140 && g < 90 && b < 90 && r > g * 1.6 && r > b * 1.6;

const isLightBackground = (color: [number, number, number, number]): boolean =>
    color[3] > 0.2 && getLuminance(color[0], color[1], color[2]) > 0.62;

const isTransparentBackground = (color: [number, number, number, number]): boolean => color[3] < 0.2;

const hasRedGradient = (value: string): boolean =>
    /255,\s*46,\s*46|232,\s*0,\s*0|255\s+46\s+46|#e80000|#ff2e2e/i.test(value);

const getPseudoStyle = (element: Element, pseudo: "::before" | "::after"): CSSStyleDeclaration | null => {
    try {
        return window.getComputedStyle(element, pseudo);
    } catch {
        return null;
    }
};

const getSurfaceToneFromBackground = (color: [number, number, number, number] | null): CursorTone | null => {
    if (!color || isTransparentBackground(color)) {
        return null;
    }

    if (isRedBackground(color)) {
        return "black";
    }

    if (isLightBackground(color)) {
        return "red";
    }

    return null;
};

const hasVisibleRedPseudoLayer = (element: HTMLElement): boolean => {
    const beforeStyle = getPseudoStyle(element, "::before");
    const afterStyle = getPseudoStyle(element, "::after");

    if (!beforeStyle) {
        return false;
    }

    const beforeColor = parseColor(beforeStyle.backgroundColor);
    const beforeIsRed =
        (beforeColor && isRedBackground(beforeColor)) || hasRedGradient(beforeStyle.backgroundImage);

    if (!beforeIsRed || Number.parseFloat(beforeStyle.opacity) < 0.5) {
        return false;
    }

    if (!afterStyle) {
        return true;
    }

    const afterOpacity = Number.parseFloat(afterStyle.opacity);
    const afterColor = parseColor(afterStyle.backgroundColor);
    const afterCovers =
        afterOpacity > 0.5 && afterColor !== null && !isTransparentBackground(afterColor);

    return !afterCovers;
};

const detectSurfaceTone = (element: HTMLElement): CursorTone | null => {
    const explicitTone = element.dataset.cursorTone;

    if (explicitTone === "black" || explicitTone === "red") {
        return explicitTone;
    }

    const style = window.getComputedStyle(element);
    const backgroundTone = getSurfaceToneFromBackground(parseColor(style.backgroundColor));

    if (backgroundTone) {
        return backgroundTone;
    }

    if (hasRedGradient(style.backgroundImage)) {
        return "black";
    }

    if (hasVisibleRedPseudoLayer(element)) {
        return "black";
    }

    return null;
};

const detectToneAtPoint = (x: number, y: number): CursorTone => {
    let element = document.elementFromPoint(x, y) as HTMLElement | null;

    while (element) {
        const tone = detectSurfaceTone(element);

        if (tone) {
            return tone;
        }

        element = element.parentElement;
    }

    return "red";
};

const getInteractiveTarget = (x: number, y: number): HTMLElement | null => {
    const element = document.elementFromPoint(x, y);

    if (!(element instanceof Element)) {
        return null;
    }

    if (element.closest("[data-cursor-ignore]")) {
        return null;
    }

    return element.closest<HTMLElement>(INTERACTIVE_QUERY);
};

const getCursorMode = (target: EventTarget | null): CursorMode => {
    if (!(target instanceof Element)) {
        return "default";
    }

    if (target.closest("[data-cursor-ignore]")) {
        return "default";
    }

    return target.closest(INTERACTIVE_QUERY) ? "interactive" : "default";
};
const applyTone = (tone: CursorTone): void => {
    document.documentElement.style.setProperty("--sc-dot-color", CURSOR_COLORS[tone]);
};

const clearTone = (): void => {
    document.documentElement.style.removeProperty("--sc-dot-color");
};

export const StreetCursor = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const dotRef = useRef<HTMLSpanElement>(null);
    const pulseRef = useRef<HTMLSpanElement>(null);
    const frameRef = useRef<number | null>(null);
    const pointerRef = useRef({ x: 0, y: 0 });
    const renderRef = useRef({ x: 0, y: 0 });
    const isVisibleRef = useRef(false);
    const hasPointerRef = useRef(false);
    const isPressedRef = useRef(false);
    const toneRef = useRef<CursorTone>("red");
    const modeRef = useRef<CursorMode>("default");
    const toneCheckedAtRef = useRef(0);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        );

        const updateEnabledState = () => {
            setIsEnabled(mediaQuery.matches);
        };

        updateEnabledState();
        mediaQuery.addEventListener("change", updateEnabledState);

        return () => {
            mediaQuery.removeEventListener("change", updateEnabledState);
        };
    }, []);

    useEffect(() => {
        if (!isEnabled) {
            return undefined;
        }

        const dot = dotRef.current;
        const pulse = pulseRef.current;

        if (!dot || !pulse) {
            return undefined;
        }

        document.documentElement.setAttribute("data-street-cursor", "true");
        applyTone(toneRef.current);

        let previousTime = performance.now();

        const render = (time: number) => {
            const delta = Math.min(3, (time - previousTime) / TARGET_FRAME_MS);
            previousTime = time;

            if (isVisibleRef.current) {
                const pointer = pointerRef.current;
                const renderPoint = renderRef.current;
                let targetX = pointer.x;
                let targetY = pointer.y;

                const interactiveTarget = getInteractiveTarget(pointer.x, pointer.y);

                if (interactiveTarget) {
                    const rect = interactiveTarget.getBoundingClientRect();

                    targetX += (rect.left + rect.width / 2 - pointer.x) * MAGNET_STRENGTH;
                    targetY += (rect.top + rect.height / 2 - pointer.y) * MAGNET_STRENGTH;
                }

                const follow = Math.min(1, FOLLOW_STRENGTH * delta);

                renderPoint.x += (targetX - renderPoint.x) * follow;
                renderPoint.y += (targetY - renderPoint.y) * follow;

                const maxX = window.innerWidth;
                const maxY = window.innerHeight;

                renderPoint.x = Math.min(maxX, Math.max(0, renderPoint.x));
                renderPoint.y = Math.min(maxY, Math.max(0, renderPoint.y));

                const scale = isPressedRef.current ? 0.8 : 1;

                dot.style.transform = `translate3d(${renderPoint.x}px, ${renderPoint.y}px, 0) scale(${scale})`;
                pulse.style.transform = `translate3d(${renderPoint.x}px, ${renderPoint.y}px, 0) translate(-50%, -50%)`;
            }

            frameRef.current = window.requestAnimationFrame(render);
        };

        const handlePointerMove = (event: PointerEvent) => {
            pointerRef.current = { x: event.clientX, y: event.clientY };

            if (!hasPointerRef.current) {
                hasPointerRef.current = true;
                renderRef.current = { x: event.clientX, y: event.clientY };
            }

            isVisibleRef.current = true;
            dot.dataset.visible = "true";
            pulse.dataset.visible = "true";

            const mode = getCursorMode(event.target);

            if (mode !== modeRef.current) {
                modeRef.current = mode;
                dot.dataset.mode = mode;
                pulse.dataset.mode = mode;
            }

            if (event.timeStamp - toneCheckedAtRef.current > TONE_CHECK_INTERVAL) {
                toneCheckedAtRef.current = event.timeStamp;

                const nextTone = detectToneAtPoint(event.clientX, event.clientY);

                if (nextTone !== toneRef.current) {
                    toneRef.current = nextTone;
                    applyTone(nextTone);
                }
            }
        };

        const handlePointerDown = () => {
            isPressedRef.current = true;
            dot.dataset.pressed = "true";
            pulse.dataset.hit = "false";
            void pulse.offsetWidth;
            pulse.dataset.hit = "true";
        };

        const handlePointerUp = () => {
            isPressedRef.current = false;
            dot.dataset.pressed = "false";
            pulse.dataset.hit = "false";
        };

        const handlePointerLeave = () => {
            isVisibleRef.current = false;
            dot.dataset.visible = "false";
            pulse.dataset.visible = "false";
            pulse.dataset.mode = "default";
            pulse.dataset.hit = "false";
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointerup", handlePointerUp);
        document.documentElement.addEventListener("mouseleave", handlePointerLeave);

        frameRef.current = window.requestAnimationFrame(render);

        return () => {
            document.documentElement.removeAttribute("data-street-cursor");
            clearTone();

            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointerup", handlePointerUp);
            document.documentElement.removeEventListener("mouseleave", handlePointerLeave);

            if (frameRef.current !== null) {
                window.cancelAnimationFrame(frameRef.current);
            }
        };
    }, [isEnabled]);

    if (!isEnabled) {
        return null;
    }

    return (
        <>
            <span
                className={styles.pulse}
                ref={pulseRef}
                data-visible="false"
                data-mode="default"
                data-hit="false"
                aria-hidden="true"
            >
                <span className={styles.pulseRing} />
            </span>
            <span
                className={styles.dot}
                ref={dotRef}
                data-visible="false"
                data-mode="default"
                data-pressed="false"
                aria-hidden="true"
            >
                <svg className={styles.mark} viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <mask id="street-cursor-slashed-dot">
                        <rect width="24" height="24" fill="white" />
                        <rect
                            x="10"
                            y="2"
                            width="4"
                            height="20"
                            rx="2"
                            fill="black"
                            transform="rotate(36 12 12)"
                        />
                    </mask>
                    <circle cx="12" cy="12" r="8" mask="url(#street-cursor-slashed-dot)" />
                </svg>
            </span>
        </>
    );
};
