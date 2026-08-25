import clsx from "clsx";

import type { SectionTagProps } from "./types";

import styles from "./SectionTag.module.scss";

export const SectionTag = ({ children, className, orientation = "vertical", ...props }: SectionTagProps) => {
    return (
        <span {...props} className={clsx(styles.tag, styles[orientation], className)}>
            {children}
        </span>
    );
};
