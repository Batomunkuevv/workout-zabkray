import type { MenuItem } from "@entities/navigation";

export type DesktopMenuProps = {
    items: readonly MenuItem[];
    className?: string;
};
