import { getYandexMapsUrl } from "./helpers";
import type { ContactChannel, FederationPlace } from "./types";

export const FEDERATION_PLACE: FederationPlace = {
    title: "Федерация воркаута Забайкальского края",
    address: "Чита, улица Ленина, 1, 2 этаж",
    coordinates: {
        lat: 52.020653,
        lon: 113.533826,
    },
    zoom: 18,
    yandexOrgId: "50961952321",
};

export const CONTACT_PHONE = {
    id: "phone",
    label: "Телефон",
    value: "8 (914) 497 94-71",
    href: "tel:+79144979471",
    external: false,
} as const satisfies ContactChannel;

export const CONTACT_EMAIL = {
    id: "email",
    label: "Почта",
    value: "workout.zab.kray@mail.ru",
    href: "mailto:workout.zab.kray@mail.ru",
    external: false,
} as const satisfies ContactChannel;

export const CONTACT_ADDRESS = {
    id: "address",
    label: "Адрес",
    value: FEDERATION_PLACE.address,
    href: getYandexMapsUrl(FEDERATION_PLACE),
    external: true,
} as const satisfies ContactChannel;

export const CONTACT_LINKS = [CONTACT_PHONE, CONTACT_EMAIL] as const;

export const CONTACT_CHANNELS = [CONTACT_PHONE, CONTACT_EMAIL, CONTACT_ADDRESS] as const;
