import type { Metadata } from "next";

import { Button, Container, ResponsiveImage, SectionStack, Typography } from "@shared/ui";

import styles from "./not-found.module.scss";

export const metadata: Metadata = {
    title: "Страница не найдена | Федерация воркаута Забайкальского края",
    description:
        "Запрошенная страница не найдена. Перейдите на главную или в разделы: зал, атлеты, контакты.",
    robots: { index: false, follow: true },
};

const NotFound = () => {
    return (
        <SectionStack>
            <section className={styles.notFound} data-header-theme="light">
                <Container className={styles.container}>
                    <div className={styles.poster}>
                        <div className={styles.codeScene} aria-hidden="true">
                            <span className={styles.digit}>4</span>
                            <div className={styles.media}>
                                <ResponsiveImage
                                    src="/images/404.jpg"
                                    alt="Команда федерации воркаута в спортивном зале"
                                    sizes="(max-width: 479px) 80vw, (max-width: 959px) 72vw, 480px"
                                    priority
                                    className={styles.imageRoot}
                                    wrapperClassName={styles.image}
                                />
                            </div>
                            <span className={styles.digit}>4</span>
                        </div>

                        <div className={styles.copy}>
                            <span className={styles.eyebrow}>Ошибка 404</span>
                            <Typography variant="h1" className={styles.title} typograph={false}>
                                Не та <span className={styles.titleAccent}>площадка</span>
                            </Typography>
                            <Typography variant="bodyLarge" className={styles.text}>
                                Такой страницы не&nbsp;существует. Зато существуют тренировки и&nbsp;новые рекорды.
                            </Typography>

                            <div className={styles.actions}>
                                <Button href="/" tone="dark" className={styles.button}>
                                    На главную
                                </Button>
                                <Button href="/athletes" tone="light" className={styles.secondaryButton}>
                                    Атлеты
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </SectionStack>
    );
};

export default NotFound;
