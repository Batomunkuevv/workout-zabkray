import { TRAINERS } from "@entities/trainers";
import { Breadcrumbs, Container, Typography } from "@shared/ui";

import { TrainerPreviewCard } from "./TrainerPreviewCard";

import styles from "./TrainersRoster.module.scss";

const SECTION_TEXT =
    "Команда тренеров в Чите — от первых шагов в воркауте до сложных элементов и подготовки к соревнованиям. Выбери тренера, посмотри профиль и запишись на тренировку.";

export const TrainersRoster = () => {
    return (
        <section
            className={styles.roster}
            aria-labelledby="trainers-roster-title"
            data-header-theme="light"
        >
            <Container>
                <header className={styles.header}>
                    <Breadcrumbs
                        items={[
                            { label: "Главная", href: "/" },
                            { label: "Тренеры", href: "/trainers" },
                        ]}
                    />
                    <div className={styles.intro}>
                        <Typography id="trainers-roster-title" variant="h1" className={styles.title}>
                            Тренеры
                            <br />
                            федерации
                        </Typography>
                        <Typography variant="bodyLarge" className={styles.lead}>
                            {SECTION_TEXT}
                        </Typography>
                    </div>
                </header>

                <ul className={styles.list}>
                    {TRAINERS.map((trainer, index) => (
                        <li key={trainer.id}>
                            <TrainerPreviewCard trainer={trainer} priority={index === 0} />
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};
