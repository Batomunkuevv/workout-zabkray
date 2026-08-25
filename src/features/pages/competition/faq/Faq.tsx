"use client";

import { useId, useState } from "react";
import clsx from "clsx";

import { Container, Typography } from "@shared/ui";

import type { Competition } from "@entities/competitions";

import styles from "./Faq.module.scss";

type DetailFaqProps = {
    competition: Competition;
};

export const Faq = ({ competition }: DetailFaqProps) => {
    const baseId = useId();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex((current) => (current === index ? null : index));
    };

    return (
        <section className={styles.faq} aria-labelledby={`competition-faq-title-${competition.slug}`}>
            <Container>
                <div className={styles.faqGrid}>
                    <div className={styles.head}>
                        <Typography id={`competition-faq-title-${competition.slug}`} variant="h2" className={styles.sectionTitle}>
                            {competition.faqTitle}
                        </Typography>
                        <Typography className={styles.sectionText}>{competition.faqText}</Typography>
                    </div>

                    <ul className={styles.list}>
                        {competition.faq.map((item, index) => {
                            const isOpen = openIndex === index;
                            const panelId = `${baseId}-panel-${index}`;
                            const buttonId = `${baseId}-button-${index}`;

                            return (
                                <li key={item.question} className={clsx(styles.item, isOpen && styles.itemOpen)}>
                                    <button
                                        type="button"
                                        id={buttonId}
                                        className={styles.question}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        onClick={() => toggle(index)}
                                    >
                                        <Typography as="span" className={styles.questionText}>
                                            {item.question}
                                        </Typography>
                                        <span className={styles.marker} aria-hidden="true" />
                                    </button>

                                    <div
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={buttonId}
                                        className={styles.answerWrap}
                                    >
                                        <div className={styles.answerInner}>
                                            <Typography className={styles.answer}>{item.answer}</Typography>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Container>
        </section>
    );
};
