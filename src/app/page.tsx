import type { Metadata } from "next";

import { HomePage } from "@features/pages";
import { SectionStack } from "@shared/ui";

export const metadata: Metadata = {
    title: "Федерация воркаута Забайкальского края — тренировки и соревнования в Чите",
    description:
        "Федерация воркаута Забайкальского края в Чите. Тренировки в зале для начинающих и опытных атлетов, соревнования, подготовка к стартам и развитие воркаута.",
};

const Home = () => {
    return (
        <SectionStack>
            <HomePage.Hero />
            <HomePage.EnergyTicker />
            <HomePage.About />
            <HomePage.GettingStarted />
            <HomePage.Schedule />
            <HomePage.Trainers />
            <HomePage.TrainingCta />
        </SectionStack>
    );
};

export default Home;
