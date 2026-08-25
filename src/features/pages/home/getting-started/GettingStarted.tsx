import Image from "next/image";

import { OpenLeadButton } from "@features/leads";
import { Container, ResponsiveImage, SectionTag, Typography } from "@shared/ui";

import { GETTING_STARTED_COPY } from "./model";

import styles from "./GettingStarted.module.scss";

export const GettingStarted = () => {
    const { cta, ctaButton, steps } = GETTING_STARTED_COPY;

    return (
        <section
            id="getting-started"
            className={styles.section}
            aria-labelledby="home-getting-started-title"
        >
            <Container>
                <SectionTag className={styles.tag} aria-hidden="true">
                    Тренировки
                </SectionTag>

                <Typography id="home-getting-started-title" variant="h2" className={styles.title}>
                    Попасть
                    <br />
                    на тренировку – легко
                </Typography>

                <div className={styles.content}>
                    <div className={styles.visual}>
                        <span className={styles.easy} aria-hidden="true">
                            Easy
                        </span>

                        <div className={styles.visualMain}>
                            <ResponsiveImage
                                src="/images/home/getting-started/boy.png"
                                alt="Ребёнок показывает два больших пальца вверх"
                                sizes="(max-width: 959px) 72vw, 332px"
                                fit="contain"
                                wrapperClassName={styles.boy}
                            />
                        </div>

                        <div className={styles.cta}>
                            <Typography variant="h3" tone="inverse" className={styles.ctaTitle}>
                                {cta}
                            </Typography>

                            <div className={styles.ctaAction}>
                                <Image
                                    src="/images/home/getting-started/cta-mark.svg"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.ctaMark}
                                    aria-hidden
                                />
                                <OpenLeadButton
                                    variant="primary"
                                    tone="light"
                                    hoverTone="dark"
                                    className={styles.ctaButton}
                                >
                                    {ctaButton}
                                </OpenLeadButton>
                            </div>
                        </div>
                    </div>

                    <div className={styles.stepsArea}>
                        <ol className={styles.steps}>
                            {steps.map((step, index) => (
                                <li key={step.index} className={styles.step} data-step={index + 1}>
                                    <div className={styles.stepHead}>
                                        <Typography as="span" variant="body" className={styles.stepIndex}>
                                            [{step.index}]
                                        </Typography>
                                        <Typography
                                            as="span"
                                            variant="body"
                                            className={styles.stepTitle}
                                            typograph={false}
                                        >
                                            {step.title}
                                        </Typography>
                                    </div>
                                    <Typography variant="bodyLarge" className={styles.stepText}>
                                        {step.text}
                                    </Typography>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </Container>
        </section>
    );
};
