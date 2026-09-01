import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TRAINERS, getTrainerById, getTrainerHref, splitTrainerName } from "@entities/trainers";
import { TrainersPage } from "@features/pages";
import { SITE_NAME, SITE_URL, getTrainerPageJsonLd } from "@shared/lib/seo";
import { JsonLd, SectionStack } from "@shared/ui";

type TrainerRouteProps = {
    params: Promise<{
        slug: string;
    }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => {
    return TRAINERS.map((trainer) => ({
        slug: trainer.id,
    }));
};

export const generateMetadata = async ({ params }: TrainerRouteProps): Promise<Metadata> => {
    const { slug } = await params;
    const trainer = getTrainerById(slug);

    if (!trainer) {
        return {
            title: "Тренер не найден",
        };
    }

    const url = `${SITE_URL}${getTrainerHref(trainer.id)}`;
    const { givenName, familyName } = splitTrainerName(trainer.name);

    return {
        title: trainer.seo.title,
        description: trainer.seo.description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: "profile",
            locale: "ru_RU",
            url,
            siteName: SITE_NAME,
            title: trainer.seo.title,
            description: trainer.seo.description,
            firstName: givenName,
            lastName: familyName,
            images: [
                {
                    url: trainer.image,
                    alt: `${trainer.name} — ${trainer.role} в Чите`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: trainer.seo.title,
            description: trainer.seo.description,
            images: [trainer.image],
        },
    };
};

const Trainer = async ({ params }: TrainerRouteProps) => {
    const { slug } = await params;
    const trainer = getTrainerById(slug);

    if (!trainer) {
        notFound();
    }

    return (
        <>
            <JsonLd data={getTrainerPageJsonLd(trainer)} />
            <SectionStack offset="header">
                <TrainersPage.TrainerProfile trainer={trainer} />
            </SectionStack>
        </>
    );
};

export default Trainer;
