import clsx from "clsx";

import { Typography } from "@shared/ui";

import type { TextareaProps } from "./types";

import styles from "./Textarea.module.scss";

export const Textarea = ({
    id,
    label,
    hint,
    error,
    tone = "light",
    className,
    labelClassName,
    labelAside,
    disabled,
    rows = 4,
    ...textareaProps
}: TextareaProps) => {
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
        <div
            className={clsx(styles.field, styles[`field--${tone}`], error && styles.fieldInvalid, className)}
            data-disabled={disabled || undefined}
        >
            <div className={styles.labelRow}>
                <Typography as="label" htmlFor={id} variant="caption" className={clsx(styles.label, labelClassName)}>
                    {label}
                </Typography>
                {labelAside}
            </div>

            <textarea
                id={id}
                className={styles.control}
                disabled={disabled}
                rows={rows}
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={describedBy}
                {...textareaProps}
            />

            {error ? (
                <Typography id={errorId} as="p" variant="caption" className={styles.error} role="alert">
                    {error}
                </Typography>
            ) : hint ? (
                <Typography id={hintId} as="p" variant="caption" className={styles.hint}>
                    {hint}
                </Typography>
            ) : null}
        </div>
    );
};
