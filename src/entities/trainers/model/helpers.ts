import { TRAINERS, TRAINERS_HREF } from "./constants";
import type { Trainer } from "./types";

export const formatExperienceYears = (value: number | string) => {
    if (typeof value === "string") {
        return `${value} года`;
    }

    const mod100 = value % 100;
    const mod10 = mod100 % 10;

    if (mod100 > 10 && mod100 < 20) {
        return `${value} лет`;
    }

    if (mod10 === 1) {
        return `${value} год`;
    }

    if (mod10 > 1 && mod10 < 5) {
        return `${value} года`;
    }

    return `${value} лет`;
};

export const getTrainerHref = (trainerId: string) => `${TRAINERS_HREF}/${trainerId}`;

export const getTrainerById = (id: string): Trainer | undefined => {
    return TRAINERS.find((trainer) => trainer.id === id);
};

export const getRelatedTrainers = (trainerId: string): Trainer[] => {
    return TRAINERS.filter((trainer) => trainer.id !== trainerId);
};

export const splitTrainerName = (name: string) => {
    const [givenName = name, ...familyParts] = name.split(" ");

    return {
        givenName,
        familyName: familyParts.join(" "),
    };
};

const GIVEN_NAME_DATIVE: Record<string, string> = {
    Николай: "Николаю",
    Максим: "Максиму",
    Кирилл: "Кириллу",
    Ярослав: "Ярославу",
};

export const getTrainerGivenNameDative = (givenName: string) => {
    return GIVEN_NAME_DATIVE[givenName] ?? givenName;
};
