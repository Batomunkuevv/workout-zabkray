import {
    MAX_LEAD_COMMENT_LENGTH,
    MAX_LEAD_NAME_LENGTH,
    MAX_LEAD_PHONE_DIGITS,
    MIN_LEAD_PHONE_DIGITS,
} from "./constants";
import type { Lead, ParseLeadResult } from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
};

const asTrimmedString = (value: unknown): string | null => {
    if (typeof value !== "string") {
        return null;
    }

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : null;
};

const countPhoneDigits = (phone: string): number => {
    return phone.replace(/\D/g, "").length;
};

export const parseLead = (payload: unknown): ParseLeadResult => {
    if (!isRecord(payload)) {
        return { ok: false, error: "invalid_payload" };
    }

    const name = asTrimmedString(payload.name);
    const phone = asTrimmedString(payload.phone);

    if (!name || name.length > MAX_LEAD_NAME_LENGTH) {
        return { ok: false, error: "invalid_name" };
    }

    if (!phone || countPhoneDigits(phone) < MIN_LEAD_PHONE_DIGITS || countPhoneDigits(phone) > MAX_LEAD_PHONE_DIGITS) {
        return { ok: false, error: "invalid_phone" };
    }

    const comment = asTrimmedString(payload.comment);

    const lead: Lead = {
        name,
        phone,
    };

    if (comment) {
        lead.comment = comment.slice(0, MAX_LEAD_COMMENT_LENGTH);
    }

    return { ok: true, lead };
};
