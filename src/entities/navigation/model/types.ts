export type MenuLeaf = {
    title: string;
    href: string;
};

export type MenuGroup = {
    title: string;
    href?: string;
    children: readonly MenuLeaf[];
};

export type MenuItem = MenuLeaf | MenuGroup;
