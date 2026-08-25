import { typographHtml } from "@shared/lib";
import { Container, Typography } from "@shared/ui";

import styles from "./Hero.module.scss";

const HERO_LEAD =
    "Кубки, турниры и открытые соревнования Забайкалья — в одном месте. Здесь можно выбрать событие, посмотреть программу, статус, новости и ключевую информацию для участников.";

const PAGE_STATS = [
    { value: "Кубки", label: "главные события сезона" },
    { value: "Турниры", label: "открытые события для атлетов" },
    { value: "Итоги", label: "новости, результаты и фото" },
] as const;

export const Hero = () => {
    return (
        <section className={styles.hero} aria-labelledby="competitions-hero-title">
            <div className={styles.shell}>
                <div className={styles.fullBleed}>
                    <Container>
                        <div className={styles.heroGrid}>
                            <div className={styles.header}>
                                <Typography as="span" variant="caption" tone="inverse" className={styles.eyebrow}>
                                    Соревнования
                                </Typography>
                                <Typography
                                    id="competitions-hero-title"
                                    variant="h1"
                                    tone="inverse"
                                    className={styles.title}
                                >
                                    Календарь соревнований Федерации
                                </Typography>
                                <Typography variant="bodyLarge" tone="inverse" className={styles.text}>
                                    {typographHtml(HERO_LEAD)}
                                </Typography>
                            </div>

                            <ul className={styles.stats} aria-label="Что будет на странице соревнований">
                                {PAGE_STATS.map((item) => (
                                    <li key={item.value}>
                                        <strong>{item.value}</strong>
                                        <span>{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Container>
                </div>
            </div>
        </section>
    );
};
