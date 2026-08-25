export type ContactChannelId = "phone" | "email" | "address";

export type ContactChannel = {
    id: ContactChannelId;
    label: string;
    value: string;
    href: string;
    external?: boolean;
};

export type FederationPlace = {
    title: string;
    address: string;
    coordinates: {
        lat: number;
        lon: number;
    };
    zoom: number;
    /** ID организации в Яндекс Картах. */
    yandexOrgId?: string;
};
