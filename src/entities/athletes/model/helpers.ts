import type { AthleteAchievement, AthletePlace } from "./types";

const PLACE_LABELS: Record<AthletePlace, string> = {
    1: "1 место",
    2: "2 место",
    3: "3 место",
};

export const formatPlaceLabel = (place: AthletePlace): string => {
    return PLACE_LABELS[place];
};

export const sortAchievements = (achievements: AthleteAchievement[]): AthleteAchievement[] => {
    return [...achievements].sort((left, right) => {
        const placeDiff = left.place - right.place;

        if (placeDiff !== 0) {
            return placeDiff;
        }

        return (right.year ?? 0) - (left.year ?? 0);
    });
};

export const getAchievementKey = (achievement: AthleteAchievement): string => {
    return [achievement.event, achievement.year ?? "na", achievement.place, achievement.note ?? ""].join("-");
};
