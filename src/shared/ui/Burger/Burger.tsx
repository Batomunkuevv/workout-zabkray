import clsx from "clsx";

import { Corners } from "@shared/ui";

import type { BurgerProps } from "./types";

import styles from "./Burger.module.scss";

export const Burger = ({
    variant = "default",
    tone = "light",
    isExpanded = false,
    onClick,
    className,
}: BurgerProps) => {
    const isCloseVariant = variant === "close";
    const label = isCloseVariant ? "Закрыть меню" : "Открыть меню";

    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(styles.burger, styles[`burger--${tone}`], { [styles.burgerClose]: isCloseVariant }, className)}
            aria-label={label}
            aria-expanded={isCloseVariant ? undefined : isExpanded}
        >
            <Corners />
            <span className={styles.line}></span>
        </button>
    );
};
