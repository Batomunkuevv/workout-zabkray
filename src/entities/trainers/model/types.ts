import type { SocialLink } from "@entities/social";

export type TrainerExperience = {
    trainingYears: number;
    coachingYears: number | string;
};

export type TrainerSocialLink = SocialLink & {
    type: Extract<SocialLink["type"], "telegram" | "vk">;
};

export type Trainer = {
    id: string;
    name: string;
    role: string;
    experience: TrainerExperience;
    achievements: string[];
    socials: readonly TrainerSocialLink[];
    image: string;
};
