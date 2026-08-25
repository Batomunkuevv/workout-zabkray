import clsx from "clsx";

import { Corners } from "@shared/ui";

import type { FramedIconProps } from "./types";

import styles from "./FramedIcon.module.scss";

export const FramedIcon = ({
    className,
    wrapperClassName,
    iconClassName,
    cornersClassName,
    cornersVariant = "default",
    children,
}: FramedIconProps) => {
    return (
        <div className={clsx(styles.root, className)}>
            <div className={clsx(styles.wrapper, wrapperClassName)}>
                <Corners variant={cornersVariant} className={clsx(styles.corners, cornersClassName)} />
                <div className={clsx(styles.icon, iconClassName)}>{children}</div>
            </div>
        </div>
    );
};
