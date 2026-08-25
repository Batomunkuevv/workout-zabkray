import { Container, SectionTag, Typography } from "@shared/ui";

import type { Competition } from "@entities/competitions";

import styles from "./Categories.module.scss";

type DetailCategoriesProps = {
    competition: Competition;
};

export const Categories = ({ competition }: DetailCategoriesProps) => {
    return (
        <section className={styles.categories} aria-labelledby={`competition-categories-title-${competition.slug}`}>
            <Container>
                <div className={styles.panel}>
                    <SectionTag className={styles.tag} orientation="horizontal" aria-hidden="true">
                        Категории
                    </SectionTag>

                    <div className={styles.head}>
                        <Typography
                            id={`competition-categories-title-${competition.slug}`}
                            variant="h2"
                            tone="inverse"
                            className={styles.title}
                        >
                            {competition.categoriesTitle}
                        </Typography>
                        <Typography variant="bodyLarge" tone="inverse" className={styles.text}>
                            {competition.categoriesText}
                        </Typography>
                    </div>

                    <ul className={styles.grid}>
                        {competition.categories.map((category) => (
                            <li key={category.title} className={styles.card}>
                                <span className={styles.index} aria-hidden="true">
                                    {category.index}
                                </span>
                                <Typography as="span" tone="inverse" className={styles.level}>
                                    {category.level}
                                </Typography>
                                <Typography variant="h3" tone="inverse" className={styles.cardTitle}>
                                    {category.title}
                                </Typography>
                                <Typography tone="inverse" className={styles.cardText}>
                                    {category.description}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
};
