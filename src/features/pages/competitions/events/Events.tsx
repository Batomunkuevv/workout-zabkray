import { COMPETITIONS } from "@entities/competitions";
import { Button, Container, SectionTag, Typography } from "@shared/ui";

import styles from "./Events.module.scss";

const EVENTS_SECTION_TEXT =
    "Здесь собраны ключевые турниры и кубки сезона: даты, площадка и формат появятся по мере утверждения календаря. Следите за обновлениями — откройте карточку события, чтобы посмотреть программу, регламент и новости, когда они будут опубликованы.";

export const Events = () => {
    return (
        <section className={styles.eventsBand} aria-labelledby="competitions-events-title">
            <Container>
                <SectionTag className={styles.eventsTag} aria-hidden="true">
                    События
                </SectionTag>

                <header className={styles.sectionHeader}>
                    <div className={styles.sectionLead}>
                        <Typography id="competitions-events-title" variant="h2" className={styles.sectionTitle}>
                            Выбирайте соревнование и готовьтесь к площадке
                        </Typography>
                    </div>
                    <Typography variant="bodyLarge" className={styles.sectionText}>
                        {EVENTS_SECTION_TEXT}
                    </Typography>
                </header>
                <div className={styles.events}>
                    {COMPETITIONS.map((competition) => (
                        <article key={competition.slug} className={styles.event}>
                            <div className={styles.eventAccent} aria-hidden="true" />

                            <div className={styles.eventContent}>
                                <div className={styles.eventTop}>
                                    <Typography as="span" tone="inverse" className={styles.status}>
                                        {competition.status}
                                    </Typography>
                                    <Typography as="span" className={styles.eventType}>
                                        {competition.label}
                                    </Typography>
                                </div>
                                <Typography variant="h3" className={styles.cardTitle} html={competition.title} />
                                <Typography className={styles.cardText}>{competition.description}</Typography>

                                <ul className={styles.meta} aria-label={`Ключевая информация: ${competition.label}`}>
                                    {competition.meta.map((item) => (
                                        <li key={item.label}>
                                            <span>{item.label}</span>
                                            <strong>{item.value}</strong>
                                        </li>
                                    ))}
                                </ul>

                                <Button href={`/competitions/${competition.slug}`} tone="dark" className={styles.link}>
                                    Открыть событие
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
};
