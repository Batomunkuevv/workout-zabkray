import type { Metadata } from "next";

import { TRAINERS_HREF } from "@entities/trainers";
import { TrainersPage } from "@features/pages";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL, getTrainersListJsonLd } from "@shared/lib/seo";
import { JsonLd, SectionStack } from "@shared/ui";

const TITLE = "Тренеры по воркауту в Чите | Федерация воркаута Забайкальского края";
const DESCRIPTION =
    "Тренеры Федерации воркаута Забайкальского края в Чите. Расписание, опыт и запись на тренировки в зале на Ленина, 1.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
        canonical: `${SITE_URL}${TRAINERS_HREF}`,
    },
    openGraph: {
        type: "website",
        locale: "ru_RU",
        url: `${SITE_URL}${TRAINERS_HREF}`,
        siteName: SITE_NAME,
        title: TITLE,
        description: DESCRIPTION,
        images: [SITE_OG_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: [SITE_OG_IMAGE.url],
    },
};

const Trainers = () => {
    return (
        <>
            <JsonLd data={getTrainersListJsonLd()} />
            <SectionStack offset="header">
                <TrainersPage.TrainersRoster />
            </SectionStack>
        </>
    );
};

export default Trainers;
