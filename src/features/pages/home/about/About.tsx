import { Container, ResponsiveImage, SectionTag, Typography } from "@shared/ui";

import { ABOUT_ASSETS, ABOUT_COPY } from "./model";

import styles from "./About.module.scss";

export const About = () => {
    return (
        <section className={styles.about} id="about" aria-labelledby="home-about-title">
            <Container>
                <SectionTag className={styles.tag} orientation="vertical" aria-hidden="true">
                    О нас
                </SectionTag>

                <div className={styles.inner}>
                    <header className={styles.head}>
                        <Typography id="home-about-title" variant="h2" className={styles.title}>
                            Развиваем воркаут
                            <br />в Забайкалье.
                            <br />
                            Воспитываем чемпионов
                        </Typography>

                        <Typography variant="bodyLarge" className={styles.text} html={ABOUT_COPY.text} />
                    </header>

                    <div className={styles.visual}>
                        <span className={styles.spark} aria-hidden="true" />

                        <ResponsiveImage
                            src={ABOUT_ASSETS.team}
                            alt="Команда федерации на тренировке в зале воркаута"
                            sizes="(max-width: 959px) 100vw, 744px"
                            wrapperClassName={styles["main-image"]}
                        />
                    </div>

                    <aside className={styles.aside} aria-label="Миссия федерации">
                        <span className={styles.region} aria-hidden="true" />

                        <div className={styles.mission}>
                            <div className={styles["mission-photo"]}>
                                <ResponsiveImage
                                    src={ABOUT_ASSETS.mission}
                                    alt="Награды атлетов федерации на соревнованиях"
                                    sizes="(max-width: 767px) 144px, 227px"
                                    className={styles["mission-image-root"]}
                                    wrapperClassName={styles["mission-image"]}
                                />
                            </div>

                            <Typography variant="body" className={styles["mission-text"]}>
                                <span className={styles.lead}>
                                    Наша миссия
                                    {"\u00A0— "}
                                </span>
                                {ABOUT_COPY.mission}
                            </Typography>
                        </div>
                    </aside>
                </div>
            </Container>
        </section>
    );
};
