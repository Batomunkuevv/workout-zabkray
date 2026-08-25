import {
    YoutubeIcon,
    TelegramIcon,
    VkIcon,
    CameraIcon,
    ArrowUpRightIcon,
    ClockIcon,
} from "./icons";

import type { IconComponent } from "./types";

export const ICONS: Record<string, IconComponent> = {
    youtube: YoutubeIcon,
    telegram: TelegramIcon,
    vk: VkIcon,
    camera: CameraIcon,
    arrowUpRight: ArrowUpRightIcon,
    clock: ClockIcon,
};