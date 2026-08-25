import type { SocialLink } from "@entities/social";

export type SocialLinksPlainProps = {
    links: readonly SocialLink[];
    className?: string;
    ariaLabel?: string;
};
