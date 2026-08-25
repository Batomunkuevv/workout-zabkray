import { Container, SectionTag, Typography } from "@shared/ui";

import type { Competition } from "@entities/competitions";

import styles from "./About.module.scss";

type DetailAboutProps = {
    competition: Competition;
};

export const About = ({ competition }: DetailAboutProps) => {
    return (
        <section className={styles.about} aria-labelledby={`competition-about-title-${competition.slug}`}>
            <Container>
                <SectionTag className={styles.tag} aria-hidden="true">
                    Событие
                </SectionTag>

                <div className={styles.aboutGrid}>
                    <div>
                        <Typography id={`competition-about-title-${competition.slug}`} variant="h2" className={styles.sectionTitle}>
                            {competition.aboutTitle}
                        </Typography>
                        <Typography className={styles.aboutText}>{competition.aboutText}</Typography>
                    </div>

                    <ul className={styles.stats}>
                        {competition.stats.map((stat) => (
                            <li key={stat.label} className={styles.stat}>
                                <Typography as="strong" className={styles.statValue}>
                                    {stat.value}
                                </Typography>
                                <Typography as="span" className={styles.statLabel}>
                                    {stat.label}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
};
