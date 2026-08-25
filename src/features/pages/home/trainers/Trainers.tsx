import { TRAINERS } from "@entities/trainers";
import { Container, ResponsiveImage, SectionTag, SocialLinksPlain, Typography } from "@shared/ui";

import styles from "./Trainers.module.scss";

const SECTION_TEXT =
    "Команда федерации ведёт тренировки в зале воркаута: от первых подтягиваний до подготовки к соревнованиям. Каждый тренер ведёт свой формат занятий и помогает выстроить понятный маршрут прогресса.";

const formatYears = (value: number | string) => {
    if (typeof value === "string") {
        return `${value} года`;
    }

    const mod100 = value % 100;
    const mod10 = mod100 % 10;

    if (mod100 > 10 && mod100 < 20) {
        return `${value} лет`;
    }

    if (mod10 === 1) {
        return `${value} год`;
    }

    if (mod10 > 1 && mod10 < 5) {
        return `${value} года`;
    }

    return `${value} лет`;
};

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

                <ul className={styles.grid}>
                    {TRAINERS.map((trainer) => (
                        <li key={trainer.id}>
                            <article className={styles.card}>
                                <div className={styles.media}>
                                    <ResponsiveImage
                                        src={trainer.image}
                                        alt={trainer.name}
                                        sizes="(max-width: 767px) 100vw, 33vw"
                                        wrapperClassName={styles.image}
                                    />
                                    <span className={styles.accent} aria-hidden="true" />
                                </div>

                                <div className={styles.body}>
                                    <Typography as="span" className={styles.role}>
                                        {trainer.role}
                                    </Typography>

                                    <Typography variant="h3" className={styles.name}>
                                        {trainer.name}
                                    </Typography>

                                    <dl className={styles.experience}>
                                        <div className={styles.experienceItem}>
                                            <Typography as="dt" className={styles.experienceLabel}>
                                                Личный стаж
                                            </Typography>
                                            <Typography as="dd" className={styles.experienceValue}>
                                                {formatYears(trainer.experience.trainingYears)}
                                            </Typography>
                                        </div>
                                        <div className={styles.experienceItem}>
                                            <Typography as="dt" className={styles.experienceLabel}>
                                                Тренерский стаж
                                            </Typography>
                                            <Typography as="dd" className={styles.experienceValue}>
                                                {formatYears(trainer.experience.coachingYears)}
                                            </Typography>
                                        </div>
                                    </dl>

                                    <ul className={styles.achievements}>
                                        {trainer.achievements.map((achievement) => (
                                            <li key={achievement}>
                                                <Typography className={styles.achievement}>{achievement}</Typography>
                                            </li>
                                        ))}
                                    </ul>

                                    <SocialLinksPlain
                                        links={trainer.socials}
                                        ariaLabel={`Социальные сети: ${trainer.name}`}
                                        className={styles.socials}
                                    />
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};
