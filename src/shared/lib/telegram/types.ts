export type TelegramApiResponse<T> =
    | {
          ok: true;
          result: T;
      }
    | {
          ok: false;
          error_code: number;
          description: string;
      };

export type TelegramSendMessageRequest = {
    chat_id: string;
    text: string;
    parse_mode?: "HTML";
    link_preview_options?: {
        is_disabled: boolean;
    };
};

export type TelegramMessageResponse = {
    message_id: number;
};

export type SendTelegramMessageInput = {
    chatId?: string;
    text: string;
};

export type SendTelegramMessageResult = {
    messageId: string;
};
