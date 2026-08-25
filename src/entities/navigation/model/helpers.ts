import type { MenuGroup, MenuItem } from "./types";

export const isMenuGroup = (item: MenuItem): item is MenuGroup =>
    "children" in item && item.children.length > 0;

export const getMenuItemHref = (item: MenuItem): string => {
    if (isMenuGroup(item)) {
        return item.href ?? item.children[0]?.href ?? "#";
    }

    return item.href;
};
