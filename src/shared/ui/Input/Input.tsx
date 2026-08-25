import clsx from "clsx";

import { Typography } from "@shared/ui";

import type { InputProps } from "./types";

import styles from "./Input.module.scss";

export const Input = ({
    id,
    label,
    hint,
    error,
    tone = "light",
    className,
    labelClassName,
    labelAside,
    disabled,
    ...inputProps
}: InputProps) => {
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

            <input
                id={id}
                className={styles.control}
                disabled={disabled}
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={describedBy}
                {...inputProps}
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
