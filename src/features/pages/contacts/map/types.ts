export type YMapCoords = [lat: number, lon: number];

export type YMapLayout = unknown;

export type YMapPlacemarkOptions = {
    iconLayout?: string;
    iconImageHref?: string;
    iconImageSize?: [number, number];
    iconImageOffset?: [number, number];
    balloonLayout?: YMapLayout;
    balloonContentLayout?: YMapLayout;
    balloonPanelMaxMapArea?: number;
    balloonMaxWidth?: number;
    balloonShadow?: boolean;
    hideIconOnBalloonOpen?: boolean;
    balloonOffset?: [number, number];
};

export type YMapInstance = {
    destroy: () => void;
    container: {
        fitToViewport: () => void;
    };
    behaviors: {
        disable: (behavior: string) => void;
    };
    geoObjects: {
        add: (geoObject: unknown) => void;
    };
};

export type YMapsApi = {
    ready: (callback: () => void) => void;
    templateLayoutFactory: {
        createClass: (template: string, methods?: Record<string, unknown>) => YMapLayout;
    };
    shape: {
        Rectangle: new (geometry: unknown) => unknown;
    };
    geometry: {
        pixel: {
            Rectangle: new (bounds: [[number, number], [number, number]]) => unknown;
        };
    };
    Map: new (
        container: HTMLElement,
        state: {
            center: YMapCoords;
            zoom: number;
            controls?: string[];
        },
        options?: {
            suppressMapOpenBlock?: boolean;
        },
    ) => YMapInstance;
    Placemark: new (
        coords: YMapCoords,
        properties?: {
            balloonContentHeader?: string;
            balloonContentBody?: string;
            hintContent?: string;
        },
        options?: YMapPlacemarkOptions,
    ) => unknown;
};

declare global {
    interface Window {
        ymaps?: YMapsApi;
    }
}

export {};
