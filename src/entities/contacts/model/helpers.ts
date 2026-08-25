import type { FederationPlace } from "./types";

export const getPlaceCoords = (place: FederationPlace): [number, number] => [
    place.coordinates.lat,
    place.coordinates.lon,
];

/** Карточка организации / точка на Яндекс Картах. */
export const getYandexMapsUrl = (place: FederationPlace) => {
    const { lat, lon } = place.coordinates;

    if (place.yandexOrgId) {
        return `https://yandex.ru/maps/org/${place.yandexOrgId}/?ll=${lon}%2C${lat}&z=${place.zoom}`;
    }

    const point = `${lon},${lat}`;

    return `https://yandex.ru/maps/?ll=${point}&pt=${point}&z=${place.zoom}&l=map`;
};

/** Маршрут до точки в Яндекс Картах (точка А — текущая геолокация). */
export const getYandexRouteUrl = (place: FederationPlace) => {
    const { lat, lon } = place.coordinates;

    return `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`;
};
