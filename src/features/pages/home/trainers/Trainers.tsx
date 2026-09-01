import { TRAINERS } from "@entities/trainers";
import { TrainersBoard } from "@features/pages/trainers/board";
import { Container, SectionTag, Typography } from "@shared/ui";

import styles from "./Trainers.module.scss";

const SECTION_TEXT =
    "От первых подтягиваний до уверенных выступлений — тренеры помогут выстроить технику, набрать форму и двигаться дальше.";

export const Trainers = () => {
    return (
        <section className={styles.trainers} id="trainers" aria-labelledby="home-trainers-title">
            <Container>
                <SectionTag className={styles.tag} aria-hidden="true">
                    Тренеры
                </SectionTag>

                <header className={styles.header}>
                    <Typography id="home-trainers-title" variant="h2" className={styles.title}>
                        Тренируйтесь с&nbsp;теми, кто знает путь к&nbsp;результату
                    </Typography>
                    <Typography variant="bodyLarge" className={styles.lead}>
                        {SECTION_TEXT}
                    </Typography>
                </header>

                <TrainersBoard trainers={TRAINERS} />
            </Container>
        </section>
    );
};
