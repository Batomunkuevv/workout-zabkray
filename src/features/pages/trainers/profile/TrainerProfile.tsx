import {
    TRAINERS_HREF,
    formatExperienceYears,
    getRelatedTrainers,
    getTrainerHref,
    splitTrainerName,
    type Trainer,
} from "@entities/trainers";
import { OpenLeadButton } from "@features/leads";
import { Breadcrumbs, Container, ResponsiveImage, SocialLinks, Typography } from "@shared/ui";

import { TrainersBoard } from "../board";
import { TrainerScheduleBoards } from "../schedule";
import { TrainerQuote } from "./TrainerQuote";

import styles from "./TrainerProfile.module.scss";

type TrainerProfileProps = {
    trainer: Trainer;
};

export const TrainerProfile = ({ trainer }: TrainerProfileProps) => {
    const { givenName, familyName } = splitTrainerName(trainer.name);
    const relatedTrainers = getRelatedTrainers(trainer.id);
    const headingId = `trainer-${trainer.id}-title`;

    return (
        <>
            <section className={styles.intro} aria-labelledby={headingId} data-header-theme="light">
                <Container>
                    <header className={styles.header}>
                        <Breadcrumbs
                            items={[
                                { label: "Главная", href: "/" },
                                { label: "Тренеры", href: TRAINERS_HREF },
                                { label: trainer.name, href: getTrainerHref(trainer.id) },
                            ]}
                        />

                        <div className={styles.hero}>
                            <div className={styles.identity}>
                                <Typography as="span" className={styles.role}>
                                    {trainer.role}
                                </Typography>

                                <Typography id={headingId} variant="h1" className={styles.name}>
                                    {givenName}
                                    {familyName ? (
                                        <>
                                            <br />
                                            {familyName}
                                        </>
                                    ) : null}
                                </Typography>
                            </div>

                            <div className={styles.media}>
                                <ResponsiveImage
                                    src={trainer.image}
                                    alt={`${trainer.name}, ${trainer.role} Федерации воркаута Забайкальского края в Чите`}
                                    sizes="(max-width: 767px) 100vw, 480px"
                                    priority
                                    wrapperClassName={styles.image}
                                />
                            </div>

                            <div className={styles.details}>
                                <TrainerQuote quote={trainer.quote} />

                                <div className={styles.meta}>
                                    <dl className={styles.experience}>
                                        <div className={styles.experienceItem}>
                                            <Typography as="dt" className={styles.experienceLabel}>
                                                Личный стаж
                                            </Typography>
                                            <Typography as="dd" className={styles.experienceValue}>
                                                {formatExperienceYears(trainer.experience.trainingYears)}
                                            </Typography>
                                        </div>
                                        <div className={styles.experienceItem}>
                                            <Typography as="dt" className={styles.experienceLabel}>
                                                Тренерский стаж
                                            </Typography>
                                            <Typography as="dd" className={styles.experienceValue}>
                                                {formatExperienceYears(trainer.experience.coachingYears)}
                                            </Typography>
                                        </div>
                                    </dl>

                                    {trainer.achievements.length > 0 ? (
                                        <ul className={styles.achievements} aria-label="Достижения">
                                            {trainer.achievements.map((achievement) => (
                                                <li key={achievement} className={styles.achievement}>
                                                    <Typography as="span" className={styles.achievementText}>
                                                        {achievement}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </div>

                                <div className={styles.actions}>
                                    <OpenLeadButton className={styles.leadButton}>Записаться</OpenLeadButton>

                                    {trainer.phone ? (
                                        <a
                                            href={trainer.phone.href}
                                            className={styles.phone}
                                            aria-label={`Позвонить: ${trainer.name}`}
                                        >
                                            <Typography as="span" className={styles.phoneLabel}>
                                                Телефон
                                            </Typography>
                                            <Typography as="span" className={styles.phoneValue} typograph={false}>
                                                {trainer.phone.value}
                                            </Typography>
                                        </a>
                                    ) : null}

                                    <SocialLinks
                                        links={trainer.socials}
                                        surface="onWhite"
                                        className={styles.socials}
                                    />
                                </div>
                            </div>
                        </div>
                    </header>
                </Container>
            </section>

            <section className={styles.schedule} aria-labelledby={`${trainer.id}-schedule-title`}>
                <Container>
                    <header className={styles.scheduleHead}>
                        <Typography id={`${trainer.id}-schedule-title`} variant="h2" className={styles.sectionTitle}>
                            Расписание тренера
                        </Typography>
                    </header>
                    <TrainerScheduleBoards trainer={trainer} />
                </Container>
            </section>

            {relatedTrainers.length > 0 ? (
                <section className={styles.related} aria-labelledby={`${trainer.id}-related-title`}>
                    <Container>
                        <header className={styles.relatedHead}>
                            <Typography
                                id={`${trainer.id}-related-title`}
                                variant="h2"
                                className={styles.sectionTitle}
                            >
                                Ещё тренеры зала
                            </Typography>
                        </header>
                        <TrainersBoard trainers={relatedTrainers} a11yLabel="Ещё тренеры зала" />
                    </Container>
                </section>
            ) : null}
        </>
    );
};
