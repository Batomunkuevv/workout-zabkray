import type { SocialLink } from "./types";

export const SOCIAL_LINKS = [
    { type: 'youtube', url: 'https://www.youtube.com/user/Nikolay19121', label: 'YouTube' },
    { type: 'telegram', url: 'https://t.me/workout_zabkray', label: 'Telegram' },
    { type: 'vk', url: 'https://vk.ru/workout.zab.kray', label: 'ВК' },
] satisfies readonly SocialLink[];