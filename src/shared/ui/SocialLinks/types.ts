import { SocialLink } from "@entities/social";

export type SocialLinksSurface = "onDark" | "onWhite";

export type SocialLinksProps = {
    className?: string;
    links: readonly SocialLink[];
    surface?: SocialLinksSurface;
};