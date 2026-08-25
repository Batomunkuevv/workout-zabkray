import { SocialLink } from "@entities/social";

export type SocialLinksSurface = "onDark" | "onLight" | "onWhite";

export type SocialLinksProps = {
    className?: string;
    links: readonly SocialLink[];
    surface?: SocialLinksSurface;
};