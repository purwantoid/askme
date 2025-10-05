interface BaseMenu {
    id: number;
    title: string;
    icon?: string;
    badge?: string;
    url?: string;
}

type Menu = BaseMenu & {
    items?: Menu[];
};

type MenuCollapsible = BaseMenu & {
    items: (BaseMenu & {})[];
    url?: never;
};

type MenuItem = MenuCollapsible | Menu;

interface MenuGroup {
    title: string;
    items: MenuItem[];
}

export type { Menu, MenuGroup, MenuItem };
