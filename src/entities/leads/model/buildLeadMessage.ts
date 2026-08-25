import { LEAD_MESSAGE_TITLE } from "./constants";
import type { Lead } from "./types";

export const buildLeadMessage = (lead: Lead): string => {
    const lines = [LEAD_MESSAGE_TITLE, "", `Имя: ${lead.name}`, `Телефон: ${lead.phone}`];

    if (lead.comment) {
        lines.push("", `Комментарий: ${lead.comment}`);
    }

    return lines.join("\n");
};
