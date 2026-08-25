"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import { Burger, Typography } from "@shared/ui";

import type { ModalProps } from "./types";

import styles from "./Modal.module.scss";

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
    const panelRef = useRef<HTMLDivElement>(null);
    const generatedTitleId = useId();
    const generatedDescriptionId = useId();
    const titleId = titleIdProp ?? generatedTitleId;
    const descriptionId = description ? (descriptionIdProp ?? generatedDescriptionId) : undefined;

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        panelRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <div className={clsx(styles.root, className)} role="presentation">
            <div
                className={styles.backdrop}
                aria-hidden="true"
                data-cursor-ignore=""
                onClick={onClose}
            />

            <div
                ref={panelRef}
                className={clsx(styles.panel, styles[`panel--${align}`], panelClassName)}
                role="dialog"
                aria-modal="true"
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
        </div>,
        document.body,
    );
};
