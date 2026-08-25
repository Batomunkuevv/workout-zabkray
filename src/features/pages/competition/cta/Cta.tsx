import { Button, Container, Corners, Typography } from "@shared/ui";

import type { Competition } from "@entities/competitions";

import styles from "./Cta.module.scss";

type DetailCtaProps = {
    competition: Competition;
};

export const Cta = ({ competition }: DetailCtaProps) => {
    const { cta } = competition;

    return (
        <section className={styles.ctaSection} aria-labelledby={`competition-cta-title-${competition.slug}`}>
            <Container>
                <div className={styles.panel}>
                    <Corners className={styles.corners} />
                    <span className={styles.mark} aria-hidden="true">
                        CUP
                    </span>

                    <div className={styles.content}>
                        <Typography
                            id={`competition-cta-title-${competition.slug}`}
                            variant="h2"
                            tone="inverse"
                            className={styles.title}
                        >
                            {cta.title}
                        </Typography>
                        <Typography variant="bodyLarge" tone="inverse" className={styles.text}>
                            {cta.text}
                        </Typography>
                    </div>

                    <div className={styles.actions}>
                        <Button href={cta.actionHref} tone="light" className={styles.action}>
                            {cta.actionLabel}
                        </Button>
                        {cta.note && (
                            <Typography as="span" tone="inverse" className={styles.note}>
                                {cta.note}
                            </Typography>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
};
