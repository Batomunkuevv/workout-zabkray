"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Script from "next/script";

import {
    CONTACT_PHONE,
    getPlaceCoords,
    getYandexRouteUrl,
    type FederationPlace,
} from "@entities/contacts";
import { Button, Typography } from "@shared/ui";

import type { YMapInstance } from "./types";

import { createMapBalloonHtml } from "./createMapBalloonHtml";
import { createMapBalloonLayout } from "./createMapBalloonLayout";
import { createMapPinOptions } from "./createMapPinOptions";

import "./YandexMap.balloon.scss";
import styles from "./YandexMap.module.scss";

const API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
const SCRIPT_ID = "yandex-maps-api-2-1";

type YandexMapProps = {
    place: FederationPlace;
    className?: string;
};

type MapStatus = "idle" | "ready" | "error";

const MapFallback = ({ place }: { place: FederationPlace }) => {
    return (
        <div className={styles.fallback}>
            <Typography variant="h3" tone="inverse" className={styles.fallbackTitle}>
                {place.address}
            </Typography>
            <Typography variant="body" tone="inverse" className={styles.fallbackText}>
                Откройте точку в Яндекс Картах — там маршрут и ориентиры.
            </Typography>
            <Button href={getYandexRouteUrl(place)} target="_blank" rel="noopener noreferrer" tone="light">
                Открыть карты
            </Button>
        </div>
    );
};

export const YandexMap = ({ place, className }: YandexMapProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<YMapInstance | null>(null);
    const isMountedRef = useRef(true);
    const [status, setStatus] = useState<MapStatus>(API_KEY ? "idle" : "error");

    const destroyMap = useCallback(() => {
        mapRef.current?.destroy();
        mapRef.current = null;
    }, []);

    const createMap = useCallback(() => {
        const ymaps = window.ymaps;
        const container = containerRef.current;

        if (!ymaps || !container || mapRef.current) {
            return;
        }

        ymaps.ready(() => {
            if (!isMountedRef.current || !containerRef.current || mapRef.current) {
                return;
            }

            try {
                const coords = getPlaceCoords(place);
                const routeHref = getYandexRouteUrl(place);
                const balloonHtml = createMapBalloonHtml(place, routeHref, CONTACT_PHONE);
                const BalloonLayout = createMapBalloonLayout(ymaps, balloonHtml);
                const map = new ymaps.Map(
                    containerRef.current,
                    {
                        center: coords,
                        zoom: place.zoom,
                        controls: ["zoomControl"],
                    },
                    {
                        suppressMapOpenBlock: true,
                    },
                );

                map.geoObjects.add(
                    new ymaps.Placemark(
                        coords,
                        {
                            hintContent: place.title,
                        },
                        {
                            ...createMapPinOptions(),
                            balloonLayout: BalloonLayout,
                            balloonPanelMaxMapArea: 0,
                            balloonShadow: false,
                            hideIconOnBalloonOpen: false,
                        },
                    ),
                );

                map.behaviors.disable("scrollZoom");
                mapRef.current = map;
                setStatus("ready");
            } catch {
                setStatus("error");
            }
        });
    }, [place]);

    useEffect(() => {
        isMountedRef.current = true;

        if (window.ymaps) {
            createMap();
        }

        const handleResize = () => {
            mapRef.current?.container.fitToViewport();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            isMountedRef.current = false;
            window.removeEventListener("resize", handleResize);
            destroyMap();
        };
    }, [createMap, destroyMap]);

    if (!API_KEY) {
        return (
            <div className={clsx(styles.frame, className)}>
                <MapFallback place={place} />
            </div>
        );
    }

    return (
        <div className={clsx(styles.frame, className)}>
            <Script
                id={SCRIPT_ID}
                src={`https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`}
                strategy="afterInteractive"
                onLoad={createMap}
                onError={() => setStatus("error")}
            />
            <div ref={containerRef} className={styles.map} />
            {status === "error" ? <MapFallback place={place} /> : null}
            {status === "ready" ? (
                <Button
                    href={getYandexRouteUrl(place)}
                    target="_blank"
                    rel="noopener noreferrer"
                    tone="light"
                    className={styles.route}
                >
                    Маршрут
                </Button>
            ) : (
                <span className={styles.mark} aria-hidden>
                    Чита
                </span>
            )}
        </div>
    );
};
