import type { Metadata } from "next";

import { AthletesPage } from "@features/pages";
import { SectionStack } from "@shared/ui";

export const metadata: Metadata = {
    title: "Атлеты Федерации воркаута Забайкальского края | Чита",
    description:
        "Атлеты Федерации воркаута Забайкальского края — победители и призёры городских, краевых и всероссийских соревнований. Результаты, достижения и путь спортсменов.",
};

const Athletes = () => {
    return (
        <SectionStack offset="header">
            <AthletesPage.Roster />
        </SectionStack>
    );
};

export default Athletes;
