import type { MenuItem } from "./types";

export const MENU_ITEMS = [
    {
        title: "Федерация",
        children: [
            { title: "О федерации", href: "/#about" },
            { title: "Тренеры", href: "/#trainers" },
        ],
    },
    { title: "Атлеты", href: "/athletes" },
    {
        title: "Зал",
        children: [
            { title: "Расписание", href: "/#schedule" },
            { title: "Как попасть", href: "/#getting-started" },
        ],
    },
    { title: "Контакты", href: "/contacts" },
] as const satisfies readonly MenuItem[];
