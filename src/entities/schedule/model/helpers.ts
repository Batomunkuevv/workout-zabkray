import { WEEK_DAYS } from "./constants";
import type { WeekDayId } from "./types";

const stripLeadingZero = (value: string) => value.replace(/^0/, "");

export const formatTimeRange = (start: string, end: string) =>
    `${stripLeadingZero(start)}–${stripLeadingZero(end)}`;

export const formatDayShorts = (days: readonly WeekDayId[]) =>
    days.map((dayId) => WEEK_DAYS[dayId].short).join(" · ");
