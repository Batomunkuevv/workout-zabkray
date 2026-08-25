export type TelegramConfig = {
    botToken: string;
    chatId: string;
    apiBaseUrl: string;
};

const DEFAULT_API_BASE_URL = "https://api.telegram.org";

const readRequiredEnv = (name: string): string => {
    const value = process.env[name]?.trim();

    if (!value) {
        throw new Error(`Missing required env variable: ${name}`);
    }

    return value;
};

export const getTelegramConfig = (): TelegramConfig => {
    return {
        botToken: readRequiredEnv("TELEGRAM_BOT_TOKEN"),
        chatId: readRequiredEnv("TELEGRAM_CHAT_ID"),
        apiBaseUrl: process.env.TELEGRAM_API_URL?.trim() || DEFAULT_API_BASE_URL,
    };
};

export const isTelegramConfigured = (): boolean => {
    return Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim() && process.env.TELEGRAM_CHAT_ID?.trim());
};
