import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import type { ResponsiveImageProps } from "./types";

import styles from "./ResponsiveImage.module.scss";

export const ResponsiveImage = ({
    href,
    className,
    wrapperClassName,
    fit = "cover",
    alt = "",
    sizes,
    ...imgProps
}: ResponsiveImageProps) => {
    const content = (
        <div className={clsx(styles.wrapper, wrapperClassName)}>
            <Image {...imgProps} alt={alt} fill sizes={sizes} className={styles.image} style={{ objectFit: fit }} />
        </div>
    );

    if (href) {
        return (
            <Link href={href} className={clsx(styles.root, className)}>
                {content}
            </Link>
        );
    }

    return <div className={clsx(styles.root, className)}>{content}</div>;
};
