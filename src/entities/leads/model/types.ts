export type Lead = {
    name: string;
    phone: string;
    comment?: string;
};

export type ParseLeadError = "invalid_payload" | "invalid_name" | "invalid_phone";

export type ParseLeadResult =
    | {
          ok: true;
          lead: Lead;
      }
    | {
          ok: false;
          error: ParseLeadError;
      };

export type SendLeadResult = {
    sent: boolean;
    messageId: string | null;
    skippedReason: string | null;
};
