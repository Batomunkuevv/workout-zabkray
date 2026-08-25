import clsx from "clsx";

import { Container, SECTION_INSET_CLASS, Typography } from "@shared/ui";

import type { Competition } from "@entities/competitions";

import styles from "./Prizes.module.scss";

type DetailPrizesProps = {
    competition: Competition;
};

export const Prizes = ({ competition }: DetailPrizesProps) => {
    const { prizes } = competition;

    return (
        <section
            className={clsx(styles.prizes, SECTION_INSET_CLASS)}
            aria-labelledby={`competition-prizes-title-${competition.slug}`}
        >
            <Container>
                <div className={styles.head}>
                    <Typography
                        id={`competition-prizes-title-${competition.slug}`}
                        variant="h2"
                        tone="inverse"
                        className={styles.sectionTitle}
                    >
                        {competition.prizesTitle}
                    </Typography>
                    <Typography variant="bodyLarge" tone="inverse" className={styles.sectionText}>
                        {competition.prizesText}
                    </Typography>
                </div>

                <div className={styles.layout}>
                    <div className={styles.fundCard}>
                        <Typography as="strong" tone="inverse" className={styles.fundValue}>
                            {prizes.fund}
                        </Typography>
                        <Typography as="span" tone="inverse" className={styles.fundLabel}>
                            {prizes.fundLabel}
                        </Typography>
                        <Typography tone="inverse" className={styles.fundNote}>
                            {prizes.note}
                        </Typography>
                    </div>

                    <ol className={styles.places}>
                        {prizes.places.map((prize) => (
                            <li key={prize.place} className={styles.place}>
                                <Typography as="span" tone="inverse" className={styles.placeMark}>
                                    {prize.place}
                                </Typography>
                                <div className={styles.placeBody}>
                                    <Typography variant="h3" tone="inverse" className={styles.placeTitle}>
                                        {prize.title}
                                    </Typography>
                                    <Typography tone="inverse" className={styles.placeReward}>
                                        {prize.reward}
                                    </Typography>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </Container>
        </section>
    );
};
