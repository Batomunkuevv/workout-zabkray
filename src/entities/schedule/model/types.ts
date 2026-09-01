export type ScheduleSlotNoteKind = "kids" | "adults";

export type ScheduleSlotNote = {
    kind: ScheduleSlotNoteKind;
    label: string;
};

export type SchedulePeriod = "morning" | "evening";

export type ScheduleSlot = {
    start: string;
    end: string;
    period: SchedulePeriod;
    note?: ScheduleSlotNote;
};

export type WeekDayId = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

export type ScheduleDay = {
    id: WeekDayId;
    title: string;
    slots: readonly ScheduleSlot[];
};

export type ScheduleGroup = {
    id: string;
    dayTitles: readonly string[];
    dayShorts: readonly string[];
    slots: readonly ScheduleSlot[];
};
