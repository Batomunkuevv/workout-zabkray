import clsx from "clsx";
import Link from "next/link";

import type { ButtonProps } from "./types";
import styles from "./Button.module.scss";

export const Button = (props: ButtonProps) => {
    const {
        className,
        variant = "primary",
        tone = "dark",
        hoverTone = "red",
        disabled,
        isLoading,
        children,
    } = props;

    const isDisabled = Boolean(disabled || isLoading);

    const classNames = clsx(
        styles.button,
        styles[`button--${variant}`],
        variant !== "unstyled" && styles[`button--${variant}-${tone}`],
        variant === "primary" && hoverTone !== "red" && styles[`button--${variant}-hover-${hoverTone}`],
        isDisabled && styles["button--disabled"],
        isLoading && styles["button--loading"],
        className,
    );

    if ("href" in props && props.href !== undefined) {
        const { href, target, rel } = props;

        return (
            <Link
                href={href}
                className={classNames}
                aria-disabled={isDisabled || undefined}
                tabIndex={isDisabled ? -1 : undefined}
                target={target}
                rel={rel}
            >
                {children}
            </Link>
        );
    }

    const { type = "button", onClick } = props;

    return (
        <button
            type={type}
            className={classNames}
            disabled={isDisabled}
            aria-busy={isLoading || undefined}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
