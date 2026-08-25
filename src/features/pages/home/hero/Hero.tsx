import { Container, Typography, ResponsiveImage } from "@shared/ui";
import { OpenLeadCta } from "@features/leads";

import { HeroAdvantages } from "./HeroAdvantages";

import styles from "./Hero.module.scss";

export const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.shell}>
                <div className={styles["full-bleed"]}>
                    <Container>
                        <div className={styles.header}>
                            <Typography variant="h1" tone="inverse" className={styles.title}>
                                ФЕДЕРАЦИЯ ВОРКАУТА
                                <br />
                                <span className={styles["title-part-desktop"]}>ЗАБАЙКАЛЬСКОГО КРАЯ</span>
                                <span className={styles["title-part-mobile"]}>ЗАБ. КРАЯ</span>
                            </Typography>
                            <OpenLeadCta size="md" className={styles.cta} />
                        </div>
                        <Typography variant="bodyLarge" tone="inverse" className={styles.text}>
                            Зал воркаута с&nbsp;продуманной системой тренировок&nbsp;&mdash; научим подтягиваться,
                            делать элементы и&nbsp;развивать силу на&nbsp;любом уровне подготовки
                        </Typography>
                        <div className={styles.bottom}>
                            <OpenLeadCta wideFrame className={styles["cta-tablet"]} />
                            <div className={styles["image-col"]}>
                                <ResponsiveImage
                                    src="/images/home/hero/image.jpg"
                                    alt="Фото"
                                    sizes="(max-width: 959px) 100vw, 60vw"
                                    wrapperClassName={styles["image-wrapper"]}
                                />
                                <OpenLeadCta fullWidth className={styles["cta-mobile"]} />
                            </div>
                            <HeroAdvantages />
                        </div>
                    </Container>
                </div>
            </div>
        </section>
    );
};
