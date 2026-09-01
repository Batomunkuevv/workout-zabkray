import type { ScheduleSlot, WeekDayId } from "@entities/schedule";
import type { SocialLink } from "@entities/social";

export type TrainerExperience = {
    trainingYears: number;
    coachingYears: number | string;
};

export type TrainerSocialLink = SocialLink & {
    type: Extract<SocialLink["type"], "telegram" | "vk">;
};

export type TrainerPhone = {
    value: string;
    href: string;
};

export type TrainerScheduleGroup = {
    id: string;
    days: readonly WeekDayId[];
    slots: readonly ScheduleSlot[];
};

export type TrainerSeo = {
    title: string;
    description: string;
};

export type Trainer = {
    id: string;
    name: string;
    role: string;
    experience: TrainerExperience;
    lead: string;
    quote: string;
    bio: readonly string[];
    achievements: string[];
    seo: TrainerSeo;
    phone?: TrainerPhone;
    socials: readonly TrainerSocialLink[];
    image: string;
    schedule: readonly TrainerScheduleGroup[];
};
