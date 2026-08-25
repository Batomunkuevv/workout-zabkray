import clsx from "clsx";

import { SOCIAL_LINKS } from "@entities/social";
import { OpenLeadButton } from "@features/leads";

import { Burger, SocialLinks } from "@shared/ui";

import styles from "./Header.module.scss";

type HeaderActionsProps = {
    onBurgerClick: () => void;
    isScrolled: boolean;
    isMenuOpen: boolean;
};

export const HeaderActions = ({ onBurgerClick, isScrolled, isMenuOpen }: HeaderActionsProps) => {
    return (
        <div className={styles.actions}>
            <SocialLinks
                links={SOCIAL_LINKS}
                surface={isScrolled ? "onWhite" : "onDark"}
                className={clsx(styles.socials, styles["socials--desktop"])}
            />
            <OpenLeadButton tone="light" className={styles.button}>
                Записаться
            </OpenLeadButton>
            <Burger isExpanded={isMenuOpen} onClick={onBurgerClick} tone={isScrolled ? "dark" : "light"} />
        </div>
    );
};
