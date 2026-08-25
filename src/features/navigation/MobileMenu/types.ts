import type { MenuItem } from "@entities/navigation";

export type MobileMenuProps = {
    items: readonly MenuItem[];
    isOpen: boolean;
    onClose: () => void;
};
