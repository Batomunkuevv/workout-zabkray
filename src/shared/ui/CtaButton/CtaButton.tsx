import Link from "next/link";
import clsx from "clsx";

import { Corners, Icon } from "@shared/ui";

import type { CtaButtonProps } from "./types";

import styles from "./CtaButton.module.scss";

export const CtaButton = ({
    line1 = "Записаться",
    line2 = "на тренировки",
    size = "md",
    fullWidth = false,
    wideFrame = false,
    className,
    ...props
}: CtaButtonProps) => {
    const label = line2.trim().length > 0 ? `${line1} ${line2}` : line1;

    const classNames = clsx(
        styles.root,
        styles[`root--${size}`],
        fullWidth && styles["root--full"],
        wideFrame && styles["root--wide-frame"],
        className,
    );

    const content = (
        <>
            <Corners className={styles.corners} />

            <span className={styles.content}>
                <span className={styles.label}>
                    <span className={styles.line}>{line1}</span>
                    {line2.trim().length > 0 && <span className={styles.line}>{line2}</span>}
                </span>

                <span className={styles.blobs}>
                    <span className={styles.blobBack} />
                    <span className={styles.blobFront}>
                        <Icon name="arrowUpRight" className={styles.arrow} />
                    </span>
                </span>
            </span>
        </>
    );

    if ("href" in props && props.href !== undefined) {
        return (
            <Link href={props.href} className={classNames} aria-label={label} onClick={props.onClick}>
                {content}
            </Link>
        );
    }

    return (
        <button type="button" className={classNames} aria-label={label} onClick={props.onClick}>
            {content}
        </button>
    );
};
