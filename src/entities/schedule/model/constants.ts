import type { ScheduleDay, ScheduleGroup, SchedulePeriod, ScheduleSlot, WeekDayId } from "./types";

export const WEEK_DAYS: Record<WeekDayId, { title: string; short: string }> = {
    monday: { title: "Понедельник", short: "Пн" },
    tuesday: { title: "Вторник", short: "Вт" },
    wednesday: { title: "Среда", short: "Ср" },
    thursday: { title: "Четверг", short: "Чт" },
    friday: { title: "Пятница", short: "Пт" },
    saturday: { title: "Суббота", short: "Сб" },
};

export const SCHEDULE_PERIODS: { id: SchedulePeriod; title: string }[] = [
    { id: "morning", title: "Утро" },
    { id: "evening", title: "Вечер" },
];

const MORNING_SLOTS: ScheduleSlot[] = [
    { start: "08:00", end: "09:00", period: "morning" },
    { start: "09:00", end: "10:00", period: "morning" },
    { start: "10:00", end: "11:00", period: "morning" },
];

const SHARED_EVENING_SLOTS: ScheduleSlot[] = [
    { start: "15:00", end: "16:00", period: "evening" },
    { start: "16:00", end: "17:00", period: "evening" },
    { start: "17:00", end: "18:00", period: "evening" },
];

const MON_WED_FRI_SLOTS: ScheduleSlot[] = [
    ...MORNING_SLOTS,
    ...SHARED_EVENING_SLOTS,
    {
        start: "18:00",
        end: "19:00",
        period: "evening",
        note: { kind: "kids", label: "Дети от 3 до 7 лет" },
    },
    {
        start: "20:00",
        end: "21:00",
        period: "evening",
        note: { kind: "adults", label: "Взрослые 18+" },
    },
];

const TUE_THU_SAT_SLOTS: ScheduleSlot[] = [
    ...MORNING_SLOTS,
    ...SHARED_EVENING_SLOTS,
    { start: "18:00", end: "19:00", period: "evening" },
    { start: "19:00", end: "20:00", period: "evening" },
];

export const WEEK_SCHEDULE: ScheduleDay[] = [
    { id: "monday", title: "Понедельник", slots: MON_WED_FRI_SLOTS },
    { id: "wednesday", title: "Среда", slots: MON_WED_FRI_SLOTS },
    { id: "friday", title: "Пятница", slots: MON_WED_FRI_SLOTS },
    { id: "tuesday", title: "Вторник", slots: TUE_THU_SAT_SLOTS },
    { id: "thursday", title: "Четверг", slots: TUE_THU_SAT_SLOTS },
    { id: "saturday", title: "Суббота", slots: TUE_THU_SAT_SLOTS },
];

export const SCHEDULE_GROUPS: ScheduleGroup[] = [
    {
        id: "mon-wed-fri",
        dayTitles: ["Понедельник", "Среда", "Пятница"],
        dayShorts: ["Пн", "Ср", "Пт"],
        slots: MON_WED_FRI_SLOTS,
    },
    {
        id: "tue-thu-sat",
        dayTitles: ["Вторник", "Четверг", "Суббота"],
        dayShorts: ["Вт", "Чт", "Сб"],
        slots: TUE_THU_SAT_SLOTS,
    },
];

