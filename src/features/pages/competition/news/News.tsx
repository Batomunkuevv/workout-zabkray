import { Container, Typography } from "@shared/ui";

import type { Competition } from "@entities/competitions";

import styles from "./News.module.scss";

type DetailNewsProps = {
    competition: Competition;
};

export const News = ({ competition }: DetailNewsProps) => {
    return (
        <section className={styles.news} aria-labelledby={`competition-news-title-${competition.slug}`}>
            <Container>
                <div className={styles.sectionHeader}>
                    <Typography id={`competition-news-title-${competition.slug}`} variant="h2" className={styles.sectionTitle}>
                        {competition.newsTitle}
                    </Typography>
                    <Typography className={styles.sectionLead}>{competition.newsText}</Typography>
                </div>

                <div className={styles.newsGrid}>
                    {competition.news.map((item) => (
                        <article key={item.title} className={styles.newsCard}>
                            <Typography as="span" className={styles.newsLabel}>
                                {item.label}
                            </Typography>
                            <Typography variant="h3" className={styles.newsTitle}>
                                {item.title}
                            </Typography>
                            <Typography className={styles.newsText}>{item.text}</Typography>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
};
