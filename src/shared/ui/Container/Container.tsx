import clsx from "clsx";

import type { ContainerProps } from "./types.ts";

import styles from "./Container.module.scss";

export const Container = ({ children, className }: ContainerProps) => {
    return <div className={clsx(styles.container, className)}>{children}</div>;
};
