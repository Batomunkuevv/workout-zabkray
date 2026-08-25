import type { ContactChannel, FederationPlace } from "@entities/contacts";

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

const getBalloonTitleLines = (title: string) => {
    const splitIndex = title.indexOf(" Забайкальского");

    if (splitIndex === -1) {
        return [title];
    }

    return [title.slice(0, splitIndex), title.slice(splitIndex + 1)];
};

export const createMapBalloonHtml = (place: FederationPlace, routeHref: string, phone: ContactChannel) => {
    const routeUrl = escapeHtml(routeHref);
    const phoneHref = escapeHtml(phone.href);
    const phoneValue = escapeHtml(phone.value);
    const titleLines = getBalloonTitleLines(place.title)
        .map((line) => escapeHtml(line))
        .join("<br />");

    return `
        <div class="wz-map-balloon__card">
            <div class="wz-map-balloon__accent"></div>
            <div class="wz-map-balloon__head">
                <div class="wz-map-balloon__title">${titleLines}</div>
                <button type="button" class="wz-map-balloon__close" aria-label="Закрыть">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </button>
            </div>
            <div class="wz-map-balloon__body">
                <a class="wz-map-balloon__phone" href="${phoneHref}">${phoneValue}</a>
                <a
                    class="wz-map-balloon__route"
                    href="${routeUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                >Построить маршрут</a>
            </div>
        </div>
    `;
};
