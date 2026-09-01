import type { SchedulePeriod, ScheduleSlot, ScheduleSlotNote, WeekDayId } from "@entities/schedule";

import type { TrainerScheduleGroup } from "./types";

const MON_WED_FRI: readonly WeekDayId[] = ["monday", "wednesday", "friday"];
const TUE_THU_SAT: readonly WeekDayId[] = ["tuesday", "thursday", "saturday"];

const periodFromStart = (start: string): SchedulePeriod =>
    Number.parseInt(start.slice(0, 2), 10) < 12 ? "morning" : "evening";

const slot = (start: string, end: string, note?: ScheduleSlotNote): ScheduleSlot => ({
    start,
    end,
    period: periodFromStart(start),
    ...(note ? { note } : {}),
});

const hours = (...starts: string[]): ScheduleSlot[] =>
    starts.map((start) => {
        const [hoursPart, minutesPart = "00"] = start.split(":");
        const endHour = Number.parseInt(hoursPart, 10) + 1;
        const end = `${String(endHour).padStart(2, "0")}:${minutesPart}`;

        return slot(start, end);
    });

const group = (id: string, days: readonly WeekDayId[], slots: readonly ScheduleSlot[]): TrainerScheduleGroup => ({
    id,
    days,
    slots,
});

const MORNING_BLOCK = hours("08:00", "09:00", "10:00");
const EVENING_15_20 = hours("15:00", "16:00", "17:00", "18:00", "19:00");

export const TRAINER_SCHEDULES = {
    kazanin: [group("kazanin-mwf", MON_WED_FRI, [...MORNING_BLOCK, ...EVENING_15_20])],
    trutaev: [
        group("trutaev-mwf", MON_WED_FRI, [
            slot("17:00", "18:00", { kind: "kids", label: "Дети от 3 до 6 лет" }),
            slot("18:00", "19:00", { kind: "adults", label: "Взрослые" }),
            slot("19:00", "20:00", { kind: "adults", label: "Взрослые" }),
            slot("20:00", "21:00"),
        ]),
        group("trutaev-tts", TUE_THU_SAT, [...MORNING_BLOCK, ...hours("15:00"), ...hours("18:00")]),
    ],
    yaroslavtsev: [group("yaroslavtsev-tts", TUE_THU_SAT, [...MORNING_BLOCK, ...EVENING_15_20])],
    radchenko: [group("radchenko-mwf", MON_WED_FRI, [...hours("08:00", "09:00"), ...EVENING_15_20])],
    senotrusov: [
        group("senotrusov-mwf", MON_WED_FRI, [...hours("09:00", "10:00"), ...EVENING_15_20]),
        group("senotrusov-tts", TUE_THU_SAT, hours("18:00", "19:00")),
    ],
} as const satisfies Record<string, readonly TrainerScheduleGroup[]>;
