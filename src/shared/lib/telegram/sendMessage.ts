import { getTelegramConfig } from "./config";
import { TelegramError } from "./errors";
import type {
    SendTelegramMessageInput,
    SendTelegramMessageResult,
    TelegramApiResponse,
    TelegramMessageResponse,
    TelegramSendMessageRequest,
} from "./types";

const REQUEST_TIMEOUT_MS = 15_000;

const escapeHtml = (value: string): string => {
    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

const toTelegramError = (status: number, payload: TelegramApiResponse<unknown> | null): TelegramError => {
    const description =
        payload && !payload.ok ? payload.description : `Telegram API вернул ошибку (HTTP ${status}).`;

    console.error(`Telegram error: status=${status} ${description}`);

    return new TelegramError(description, status);
};

export const sendTelegramMessage = async (
    message: SendTelegramMessageInput,
): Promise<SendTelegramMessageResult> => {
    const config = getTelegramConfig();
    const chatId = message.chatId?.trim() || config.chatId;
    const url = `${config.apiBaseUrl}/bot${config.botToken}/sendMessage`;

    const body: TelegramSendMessageRequest = {
        chat_id: chatId,
        text: escapeHtml(message.text),
        parse_mode: "HTML",
        link_preview_options: {
            is_disabled: true,
        },
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const payload = (await response.json().catch(() => null)) as TelegramApiResponse<TelegramMessageResponse> | null;

    if (!response.ok || !payload?.ok) {
        throw toTelegramError(response.status, payload);
    }

    return {
        messageId: String(payload.result.message_id),
    };
};
