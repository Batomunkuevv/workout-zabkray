import type { Competition } from "@entities/competitions";
import { SectionStack } from "@shared/ui";

import { About } from "./about";
import { Categories } from "./categories";
import { Cta } from "./cta";
import { Faq } from "./faq";
import { Hero } from "./hero";
import { Judges } from "./judges";
import { News } from "./news";
import { Prizes } from "./prizes";
import { Program } from "./program";

type CompetitionDetailsPageProps = {
    competition: Competition;
};

export const CompetitionDetailsPage = ({ competition }: CompetitionDetailsPageProps) => {
    return (
        <SectionStack>
            <Hero competition={competition} />
            <About competition={competition} />
            <Categories competition={competition} />
            <Program competition={competition} />
            <Judges competition={competition} />
            <Prizes competition={competition} />
            <Faq competition={competition} />
            <News competition={competition} />
            <Cta competition={competition} />
        </SectionStack>
    );
};
