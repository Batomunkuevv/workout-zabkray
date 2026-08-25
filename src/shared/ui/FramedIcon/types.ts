import type { ReactNode } from "react";

import type { CornerVariants } from "@shared/ui";

export type FramedIconProps = {
    className?: string;
    wrapperClassName?: string;
    iconClassName?: string;
    cornersClassName?: string;
    cornersVariant?: CornerVariants;
    children: ReactNode;
};