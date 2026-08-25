export type AthletePlace = 1 | 2 | 3;

export type AthleteAchievement = {
    event: string;
    place: AthletePlace;
    year?: number;
    note?: string;
};

export type Athlete = {
    id: string;
    name: string;
    role?: string;
    initials: string;
    image?: string;
    achievements: AthleteAchievement[];
};
