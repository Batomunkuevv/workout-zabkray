import { Container, SectionTag, Typography } from "@shared/ui";

import type { Competition } from "@entities/competitions";

import styles from "./Judges.module.scss";

type DetailJudgesProps = {
    competition: Competition;
};

export const Judges = ({ competition }: DetailJudgesProps) => {
    return (
        <section className={styles.judges} aria-labelledby={`competition-judges-title-${competition.slug}`}>
            <Container>
                <SectionTag className={styles.tag} aria-hidden="true">
                    Судьи
                </SectionTag>

                <div className={styles.head}>
                    <Typography id={`competition-judges-title-${competition.slug}`} variant="h2" className={styles.sectionTitle}>
                        {competition.judgesTitle}
                    </Typography>
                    <Typography className={styles.sectionText}>{competition.judgesText}</Typography>
                </div>

                <ul className={styles.grid}>
                    {competition.judges.map((judge) => (
                        <li key={judge.name} className={styles.card}>
                            <span className={styles.initials} aria-hidden="true">
                                {judge.initials}
                            </span>
                            <Typography as="span" className={styles.role}>
                                {judge.role}
                            </Typography>
                            <Typography variant="h3" className={styles.name}>
                                {judge.name}
                            </Typography>
                            <Typography className={styles.bio}>{judge.bio}</Typography>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};
