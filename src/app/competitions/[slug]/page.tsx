import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { COMPETITIONS } from "@entities/competitions";
import { CompetitionDetailsPage } from "@features/pages";
import { getCompetitionEventJsonLd } from "@shared/lib/seo";
import { JsonLd } from "@shared/ui";

type CompetitionPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

const getCompetitionBySlug = (slug: string) => {
    return COMPETITIONS.find((competition) => competition.slug === slug);
};

export const generateStaticParams = () => {
    return COMPETITIONS.map((competition) => ({
        slug: competition.slug,
    }));
};

export const generateMetadata = async ({ params }: CompetitionPageProps): Promise<Metadata> => {
    const { slug } = await params;
    const competition = getCompetitionBySlug(slug);

    if (!competition) {
        return {
            title: "Соревнование не найдено",
        };
    }

    return {
        title: competition.seoTitle ?? `${competition.label} | Федерация воркаута Забайкальского края`,
        description: competition.seoDescription ?? competition.description,
    };
};

const Competition = async ({ params }: CompetitionPageProps) => {
    const { slug } = await params;
    const competition = getCompetitionBySlug(slug);

    if (!competition) {
        notFound();
    }

    return (
        <>
            <JsonLd data={getCompetitionEventJsonLd(competition)} />
            <CompetitionDetailsPage competition={competition} />
        </>
    );
};

export default Competition;
