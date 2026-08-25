import { Container, ResponsiveImage, Typography } from "@shared/ui";
import { OpenLeadCta } from "@features/leads";

import { TRAINING_CTA_ASSETS, TRAINING_CTA_COPY } from "./model";

import styles from "./TrainingCta.module.scss";

export const TrainingCta = () => {
    return (
        <section className={styles.cta} aria-labelledby="home-training-cta-title">
            <Container className={styles.container}>
                <div className={styles.panel} data-cursor-tone="black">
                    <span className={styles.stars} aria-hidden="true" />

                    <div className={styles.content}>
                        <Typography id="home-training-cta-title" variant="h2" tone="inverse" className={styles.title}>
                            <span className={styles.titleDesktop}>
                                {TRAINING_CTA_COPY.titleDesktop.map((line, index) => (
                                    <span key={line}>
                                        {index > 0 && <br />}
                                        {line}
                                    </span>
                                ))}
                            </span>
                            <span className={styles.titleMobile}>
                                {TRAINING_CTA_COPY.titleMobile.map((line, index) => (
                                    <span key={line}>
                                        {index > 0 && <br />}
                                        {line}
                                    </span>
                                ))}
                            </span>
                        </Typography>

                        <OpenLeadCta className={styles.action} />
                        <OpenLeadCta wideFrame className={styles.actionTablet} />
                        <OpenLeadCta fullWidth className={styles.actionMobile} />
                    </div>

                    <ResponsiveImage
                        src={TRAINING_CTA_ASSETS.image}
                        alt="Тренер помогает ребёнку выполнить подтягивание на турнике"
                        sizes="(max-width: 767px) 100vw, (max-width: 959px) 360px, (max-width: 1279px) 288px, 320px"
                        wrapperClassName={styles.media}
                    />
                </div>
            </Container>
        </section>
    );
};
