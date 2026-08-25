import type { Metadata } from "next";

import { CompetitionsPage } from "@features/pages";

export const metadata: Metadata = {
    title: "Соревнования по воркауту в Чите и Забайкальском крае",
    description:
        "Соревнования по воркауту в Чите и Забайкальском крае: турниры, кубки и отборочные старты. Следите за анонсами, программой и условиями участия.",
};

const Competitions = () => {
    return (
        <CompetitionsPage.Shell>
            <CompetitionsPage.Hero />
            <CompetitionsPage.Events />
        </CompetitionsPage.Shell>
    );
};

export default Competitions;
