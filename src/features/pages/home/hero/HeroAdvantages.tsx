"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { Typography, ResponsiveImage, FramedIcon, Icon } from "@shared/ui";

import { HERO_ADVANTAGES } from "./model";

import styles from "./Hero.module.scss";

const MOBILE_MEDIA_QUERY = "(max-width: 959px)";

export const HeroAdvantages = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

        const syncMobile = () => {
            setIsMobile(mediaQuery.matches);

            if (!mediaQuery.matches) {
                setActiveIndex(null);
            }
        };

        syncMobile();
        mediaQuery.addEventListener("change", syncMobile);

        return () => mediaQuery.removeEventListener("change", syncMobile);
    }, []);

    useEffect(() => {
        if (!isMobile || activeIndex === null) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;

            if (listRef.current?.contains(target)) {
                return;
            }

            setActiveIndex(null);
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [activeIndex, isMobile]);

    const handleAdvantageClick = useCallback(
        (index: number) => {
            if (!isMobile) {
                return;
            }

            setActiveIndex(index);
        },
        [isMobile],
    );

    return (
        <ul
            ref={listRef}
            className={clsx(styles.advantages, isMobile && activeIndex !== null && styles["advantages-has-active"])}
        >
            {HERO_ADVANTAGES.map((advantage, index) => (
                <li
                    key={index}
                    className={clsx(styles.advantage, isMobile && activeIndex === index && styles["advantage-active"])}
                    onClick={() => handleAdvantageClick(index)}
                >
                    <Typography tone="inverse" className={styles["advantage-text"]}>
                        {advantage.title}
                    </Typography>
                    <FramedIcon className={styles["advantage-icon"]}>
                        <Icon name="camera" />
                    </FramedIcon>
                    <ResponsiveImage
                        src={advantage.image}
                        alt="Фото"
                        fit="contain"
                        sizes="(max-width: 959px) 100vw, 10vw"
                        className={styles["advantage-image"]}
                        wrapperClassName={styles["advantage-image-wrapper"]}
                    />
                </li>
            ))}
        </ul>
    );
};
