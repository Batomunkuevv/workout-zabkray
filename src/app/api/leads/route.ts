import { sendLead } from "@features/leads/sendLead";

const getErrorStatus = (error: string): number => {
    if (error === "not_configured") {
        return 503;
    }

    if (error === "send_failed") {
        return 502;
    }

    return 400;
};

export async function POST(request: Request) {
    let payload: unknown;

    try {
        payload = await request.json();
    } catch {
        return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }

    const result = await sendLead(payload);

    if (!result.sent) {
        const error = result.skippedReason ?? "send_failed";

        return Response.json({ ok: false, error }, { status: getErrorStatus(error) });
    }

    return Response.json({ ok: true });
}
