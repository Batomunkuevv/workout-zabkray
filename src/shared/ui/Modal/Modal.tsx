"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import { useLockBodyScroll } from "@shared/lib/lockBodyScroll";
import { Burger, Typography } from "@shared/ui";

import type { ModalProps } from "./types";

import styles from "./Modal.module.scss";

const MODAL_TRANSITION_MS = 300;

const getModalTransitionMs = () => {
    if (typeof window === "undefined") {
        return MODAL_TRANSITION_MS;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : MODAL_TRANSITION_MS;
};

const useModalPresence = (isOpen: boolean) => {
    const [isMounted, setIsMounted] = useState(isOpen);
    const [isVisible, setIsVisible] = useState(false);

    if (isOpen && !isMounted) {
        setIsMounted(true);
    }

    useEffect(() => {
        if (isOpen) {
            return undefined;
        }

        setIsVisible(false);

        if (!isMounted) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            setIsMounted(false);
        }, getModalTransitionMs());

        return () => window.clearTimeout(timeoutId);
    }, [isOpen, isMounted]);

    useEffect(() => {
        if (!isOpen || !isMounted) {
            return undefined;
        }

        let innerFrame = 0;
        const outerFrame = window.requestAnimationFrame(() => {
            innerFrame = window.requestAnimationFrame(() => {
                setIsVisible(true);
            });
        });

        return () => {
            window.cancelAnimationFrame(outerFrame);
            window.cancelAnimationFrame(innerFrame);
        };
    }, [isOpen, isMounted]);

    return { isMounted, isVisible };
};

export const Modal = ({
    isOpen,
    onClose,
    title,
    titleId: titleIdProp,
    description,
    descriptionId: descriptionIdProp,
    children,
    className,
    panelClassName,
    align = "start",
    hideCloseButton = false,
}: ModalProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const generatedTitleId = useId();
    const generatedDescriptionId = useId();
    const titleId = titleIdProp ?? generatedTitleId;
    const descriptionId = description ? (descriptionIdProp ?? generatedDescriptionId) : undefined;
    const { isMounted, isVisible } = useModalPresence(isOpen);

    useLockBodyScroll(isOpen);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isVisible) {
            return;
        }

        rootRef.current?.scrollTo(0, 0);
        panelRef.current?.focus({ preventScroll: true });
    }, [isVisible]);

    if (!isMounted || typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <div
            ref={rootRef}
            className={clsx(styles.root, className)}
            data-open={isVisible}
            role="presentation"
            inert={!isVisible}
        >
            <div
                className={styles.backdrop}
                aria-hidden="true"
                data-cursor-ignore=""
                onClick={onClose}
            />

            <div className={styles.frame}>
                <div
                    ref={panelRef}
                    className={clsx(styles.panel, styles[`panel--${align}`], panelClassName)}
                    role="dialog"
                    aria-modal={isVisible || undefined}
                    aria-hidden={isVisible ? undefined : true}
                    aria-labelledby={titleId}
                    aria-describedby={descriptionId}
                    tabIndex={-1}
                >
                    <div className={styles.header}>
                        <div className={styles.heading}>
                            <Typography id={titleId} variant="h3" className={styles.title}>
                                {title}
                            </Typography>
                            {description ? (
                                <Typography id={descriptionId} variant="body" className={styles.description}>
                                    {description}
                                </Typography>
                            ) : null}
                        </div>

                        {!hideCloseButton ? (
                            <Burger variant="close" tone="dark" onClick={onClose} className={styles.close} />
                        ) : null}
                    </div>

                    {children ? <div className={styles.body}>{children}</div> : null}
                </div>
            </div>
        </div>,
        document.body,
    );
};
