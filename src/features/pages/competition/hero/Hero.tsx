import type { Competition } from "@entities/competitions";
import { Button, Container, ResponsiveImage, Typography } from "@shared/ui";

import styles from "./Hero.module.scss";

type DetailHeroProps = {
    competition: Competition;
};

export const Hero = ({ competition }: DetailHeroProps) => {
    return (
        <section className={styles.hero} aria-labelledby={`competition-detail-title-${competition.slug}`}>
            <span className={styles.watermark} aria-hidden="true">
                Workout
            </span>

            <Container>
                <div className={styles.heroGrid}>
                    <div className={styles.heroContent}>
                        <div className={styles.topline}>
                            <Typography as="span" variant="caption" tone="inverse" className={styles.eyebrow}>
                                {competition.label}
                            </Typography>
                            <Typography as="span" tone="inverse" className={styles.statusChip}>
                                {competition.status}
                            </Typography>
                        </div>

                        <Typography
                            id={`competition-detail-title-${competition.slug}`}
                            variant="h1"
                            tone="inverse"
                            className={styles.heroTitle}
                            html={competition.title}
                        />

                        <Typography variant="bodyLarge" tone="inverse" className={styles.heroText}>
                            {competition.description}
                        </Typography>

                        <div className={styles.heroActions}>
                            <Button href="#program" tone="light" className={styles.programButton}>
                                Смотреть программу
                            </Button>

                            <ul className={styles.heroBadges} aria-label={`Ключевые качества: ${competition.label}`}>
                                {competition.heroBadges.map((badge) => (
                                    <li key={badge}>{badge}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.heroMedia}>
                        <span className={styles.star} aria-hidden="true" />
                        <ResponsiveImage
                            src={competition.image}
                            alt={competition.imageAlt}
                            sizes="(max-width: 959px) 100vw, 44vw"
                            wrapperClassName={styles.heroImage}
                        />
                        <span className={styles.imageTag} aria-hidden="true">
                            {competition.label}
                        </span>
                    </div>
                </div>

                <ul className={styles.metaList} aria-label={`Ключевая информация: ${competition.label}`}>
                    {competition.meta.map((item) => (
                        <li key={item.label} className={styles.metaItem}>
                            <Typography as="span" tone="inverse" className={styles.metaLabel}>
                                {item.label}
                            </Typography>
                            <Typography as="strong" tone="inverse" className={styles.metaValue}>
                                {item.value}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};
