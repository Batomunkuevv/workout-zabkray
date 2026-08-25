import clsx from "clsx";

import { CornersProps } from "./types";

import styles from "./Corners.module.scss";

export const Corners = ({ variant = "default", className }: CornersProps) => (
    <div className={clsx(styles.corners, className)} data-variant={variant}>
        <span className={clsx(styles.corner, styles.topLeft)} />
        <span className={clsx(styles.corner, styles.topRight)} />
        <span className={clsx(styles.corner, styles.bottomRight)} />
        <span className={clsx(styles.corner, styles.bottomLeft)} />
    </div>
);
