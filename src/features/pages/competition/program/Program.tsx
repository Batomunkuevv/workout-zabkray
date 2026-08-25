import clsx from "clsx";

import { Container, SECTION_INSET_CLASS, Typography } from "@shared/ui";

import type { Competition } from "@entities/competitions";

import styles from "./Program.module.scss";

type DetailProgramProps = {
    competition: Competition;
};

export const Program = ({ competition }: DetailProgramProps) => {
    return (
        <section
            className={clsx(styles.program, SECTION_INSET_CLASS)}
            id="program"
            aria-labelledby={`competition-program-title-${competition.slug}`}
        >
            <Container>
                <div className={styles.programGrid}>
                    <div>
                        <Typography id={`competition-program-title-${competition.slug}`} variant="h2" className={styles.sectionTitle}>
                            {competition.programTitle}
                        </Typography>
                        <Typography className={styles.aboutText}>{competition.programText}</Typography>
                    </div>

                    <ol className={styles.timeline}>
                        {competition.program.map((item) => (
                            <li key={`${item.time}-${item.title}`} className={styles.timelineItem}>
                                <Typography as="time" className={styles.timelineTime}>
                                    {item.time}
                                </Typography>
                                <div>
                                    <Typography variant="h3" className={styles.timelineTitle}>
                                        {item.title}
                                    </Typography>
                                    <Typography className={styles.timelineText}>{item.text}</Typography>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </Container>
        </section>
    );
};
