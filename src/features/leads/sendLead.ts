import { buildLeadMessage, parseLead } from "@entities/leads";
import type { Lead, SendLeadResult } from "@entities/leads";
import { isTelegramConfigured, sendTelegramMessage } from "@shared/lib/telegram";

export const sendLead = async (payload: Lead | unknown): Promise<SendLeadResult> => {
    const parsed = parseLead(payload);

    if (!parsed.ok) {
        return { sent: false, messageId: null, skippedReason: parsed.error };
    }

    if (!isTelegramConfigured()) {
        console.warn("Заявка не отправлена: не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID.");

        return { sent: false, messageId: null, skippedReason: "not_configured" };
    }

    try {
        const result = await sendTelegramMessage({
            text: buildLeadMessage(parsed.lead),
        });

        return { sent: true, messageId: result.messageId, skippedReason: null };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        console.error(`Не удалось отправить заявку в Telegram: ${message}`);

        return { sent: false, messageId: null, skippedReason: "send_failed" };
    }
};
