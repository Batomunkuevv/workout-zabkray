import type { Lead } from "@entities/leads";

export type SubmitLeadResult =
    | {
          ok: true;
      }
    | {
          ok: false;
          error: string;
      };

export const submitLead = async (lead: Lead): Promise<SubmitLeadResult> => {
    const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
    });

    const payload = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

    if (!response.ok || !payload?.ok) {
        return { ok: false, error: payload?.error ?? "send_failed" };
    }

    return { ok: true };
};
