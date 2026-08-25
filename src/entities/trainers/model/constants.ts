import type { Trainer, TrainerSocialLink } from "./types";

const TRAINER_SOCIALS: readonly TrainerSocialLink[] = [
    { type: "vk", url: "#", label: "ВКонтакте" },
    { type: "telegram", url: "#", label: "Telegram" },
];

const TRUTAEV_ACHIEVEMENTS = [
    "Двукратный чемпион России по воркауту",
    "Бронзовый призёр Всемирного фестиваля молодёжи в Сочи",
    "Бронзовый призёр международной премии КАРДО",
    "Трёхкратный чемпион Siberian Power Show",
    "Многократный чемпион и призёр Забайкальского края",
] as const;

export const TRAINERS: Trainer[] = [
    {
        id: "kazanin",
        name: "Николай Казанин",
        role: "Тренер по воркауту",
        experience: {
            trainingYears: 12,
            coachingYears: 6,
        },
        achievements: [
            "Дважды финалист международных соревнований КАРДО",
            "Многократный победитель соревнований по троеборью в Забайкальском крае",
            "Призёр и победитель соревнований по воркауту в Чите",
        ],
        socials: TRAINER_SOCIALS,
        image: "/images/trainers/kazanin.jpg",
    },
    {
        id: "trutaev",
        name: "Максим Трутаев",
        role: "Тренер по воркауту",
        experience: {
            trainingYears: 7,
            coachingYears: 4,
        },
        achievements: [...TRUTAEV_ACHIEVEMENTS],
        socials: TRAINER_SOCIALS,
        image: "/images/trainers/trutaev.jpg",
    },
    {
        id: "yaroslavtsev",
        name: "Максим Ярославцев",
        role: "Тренер по воркауту и акробатике",
        experience: {
            trainingYears: 10,
            coachingYears: 5,
        },
        achievements: [
            "Серебряный призёр международной премии КАРДО в направлении динамика",
            "Многократный победитель и призёр соревнований FreestyleBar в Забайкальском крае",
        ],
        socials: TRAINER_SOCIALS,
        image: "/images/trainers/yaroslavtsev.jpg",
    },
    {
        id: "radchenko",
        name: "Кирилл Радченко",
        role: "Тренер по воркауту",
        experience: {
            trainingYears: 8,
            coachingYears: 4,
        },
        achievements: [
            "Чемпион Свердловской области",
            "Чемпион Кубка стальных братьев в Москве",
            "Чемпион России 2022 по воркауту в дисциплине freestylebar",
            "Двукратный вице-чемпион России",
            "Чемпион Дальнего Востока",
            "Абсолютный чемпион Забайкальского края",
            "Бронзовый призёр Siberian Power Show",
            "Бронзовый призёр чемпионата Забайкальского края по паркуру",
            "Топ-6 воркаутеров на международной конкурс-премии КАРДО",
        ],
        socials: TRAINER_SOCIALS,
        image: "/images/trainers/radchenko.jpg",
    },
    {
        id: "senotrusov",
        name: "Ярослав Сенотрусов",
        role: "Тренер по воркауту",
        experience: {
            trainingYears: 8,
            coachingYears: "1,5",
        },
        achievements: [
            "Победитель международной премии КАРДО",
            "Победитель соревнований «Уличная культура»",
            "Серебряный призёр Кубка федерации воркаута Забайкальского края",
        ],
        socials: TRAINER_SOCIALS,
        image: "/images/trainers/senotrusov.jpg",
    },
] as const;
