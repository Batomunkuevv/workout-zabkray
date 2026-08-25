import { ATHLETES } from "@entities/athletes";
import { Breadcrumbs, Container, Typography } from "@shared/ui";

import { AthleteCard } from "./AthleteCard";

import styles from "./Roster.module.scss";

const SECTION_TEXT =
    "Здесь тренируются те, кто превращает силу, дисциплину и характер в спортивный результат. От первых выходов на турник — до соревнований краевого и всероссийского уровня.";

export const Roster = () => {
    return (
        <section
            className={styles.roster}
            aria-labelledby="athletes-roster-title"
            data-header-theme="light"
        >
            <Container>
                <header className={styles.header}>
                    <Breadcrumbs
                        items={[
                            { label: "Главная", href: "/" },
                            { label: "Атлеты" },
                        ]}
                    />
                    <div className={styles.intro}>
                        <Typography id="athletes-roster-title" variant="h1" className={styles.title}>
                            Лучшие ученики
                            <br />
                            федерации
                        </Typography>
                        <Typography variant="bodyLarge" className={styles.lead}>
                            {SECTION_TEXT}
                        </Typography>
                    </div>
                </header>

                <ul className={styles.list}>
                    {ATHLETES.map((athlete) => (
                        <li key={athlete.id}>
                            <AthleteCard athlete={athlete} />
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};
