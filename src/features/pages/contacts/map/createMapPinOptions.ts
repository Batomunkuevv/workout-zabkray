import { MAP_PIN_IMAGE, MAP_PIN_OFFSET, MAP_PIN_SIZE } from "./constants";
import type { YMapPlacemarkOptions } from "./types";

export const createMapPinOptions = (): YMapPlacemarkOptions => ({
    iconLayout: "default#image",
    iconImageHref: MAP_PIN_IMAGE,
    iconImageSize: [...MAP_PIN_SIZE],
    iconImageOffset: [...MAP_PIN_OFFSET],
    // Поднимаем балун над меткой: центрирование по X делает layout
    balloonOffset: [0, -(MAP_PIN_SIZE[1] + 8)],
});
