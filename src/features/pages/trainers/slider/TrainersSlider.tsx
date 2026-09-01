"use client";

import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Trainer } from "@entities/trainers";
import { TrainerPreviewCard } from "../roster";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./TrainersSlider.module.scss";

type TrainersSliderProps = {
    trainers: readonly Trainer[];
    showLead?: boolean;
    a11yLabel?: string;
};

export const TrainersSlider = ({
    trainers,
    showLead = false,
    a11yLabel = "Тренеры",
}: TrainersSliderProps) => {
    return (
        <Swiper
            className={styles.slider}
            modules={[Pagination, A11y, Autoplay]}
            slidesPerView={1}
            spaceBetween={16}
            speed={1000}
            loop
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                enabled: true,
            }}
            grabCursor
            watchOverflow
            observer
            observeParents
            pagination={{ clickable: true }}
            a11y={{
                enabled: true,
                containerMessage: a11yLabel,
                paginationBulletMessage: "Перейти к слайду {{index}}",
            }}
            breakpoints={{
                480: {
                    slidesPerView: 1.35,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 2.15,
                    spaceBetween: 16,
                },
                960: {
                    slidesPerView: 2.25,
                    spaceBetween: 20,
                },
            }}
        >
            {trainers.map((trainer) => (
                <SwiperSlide key={trainer.id} className={styles.slide}>
                    <TrainerPreviewCard trainer={trainer} showLead={showLead} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
