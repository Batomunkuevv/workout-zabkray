import clsx from "clsx";

import { Typography } from "@shared/ui";

import type { CheckboxProps } from "./types";

import styles from "./Checkbox.module.scss";

export const Checkbox = ({
    id,
    label,
    error,
    tone = "light",
    className,
    disabled,
    ...inputProps
}: CheckboxProps) => {
    const errorId = error ? `${id}-error` : undefined;

    return (
        <div
            className={clsx(styles.field, styles[`field--${tone}`], error && styles.fieldInvalid, className)}
            data-disabled={disabled || undefined}
        >
            <label htmlFor={id} className={styles.label}>
                <input
                    id={id}
                    type="checkbox"
                    className={styles.input}
                    disabled={disabled}
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={errorId}
                    {...inputProps}
                />
                <span className={styles.box} aria-hidden="true">
                    <span className={styles.mark} />
                </span>
                <span className={styles.text}>{label}</span>
            </label>

            {error ? (
                <Typography id={errorId} as="p" variant="caption" className={styles.error} role="alert">
                    {error}
                </Typography>
            ) : null}
        </div>
    );
};
