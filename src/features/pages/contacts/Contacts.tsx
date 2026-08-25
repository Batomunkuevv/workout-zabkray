import { CONTACT_CHANNELS, FEDERATION_PLACE } from "@entities/contacts";
import { SOCIAL_LINKS } from "@entities/social";
import { OpenLeadCta } from "@features/leads";
import { Breadcrumbs, Container, SocialLinks, Typography } from "@shared/ui";

import { YandexMap } from "./map";

import styles from "./Contacts.module.scss";

const SECTION_TEXT =
    "Хотите начать тренироваться? Мы в Чите. Напишите или позвоните — подберём группу, расскажем, с чего начать, и встретим вас на первой тренировке.";

export const Contacts = () => {
    return (
        <section
            className={styles.contacts}
            aria-labelledby="contacts-title"
            data-header-theme="light"
        >
            <Container>
                <header className={styles.header}>
                    <Breadcrumbs
                        items={[
                            { label: "Главная", href: "/" },
                            { label: "Контакты" },
                        ]}
                    />
                    <div className={styles.intro}>
                        <Typography id="contacts-title" variant="h1" className={styles.title}>
                            Контакты
                            <br />
                            федерации
                        </Typography>
                        <Typography variant="bodyLarge" className={styles.lead}>
                            {SECTION_TEXT}
                        </Typography>
                    </div>
                </header>

                <div className={styles.body}>
                    <div className={styles.panel}>
                        <dl className={styles.channels}>
                            {CONTACT_CHANNELS.map((channel) => (
                                <div key={channel.id} className={styles.channel}>
                                    <Typography
                                        as="dt"
                                        variant="caption"
                                        tone="inverse"
                                        className={styles.channelLabel}
                                    >
                                        {channel.label}
                                    </Typography>
                                    <Typography
                                        as="dd"
                                        variant="bodyLarge"
                                        tone="inverse"
                                        className={styles.channelValue}
                                        typograph={false}
                                    >
                                        <a
                                            href={channel.href}
                                            className={styles.channelLink}
                                            target={channel.external ? "_blank" : undefined}
                                            rel={channel.external ? "noopener noreferrer" : undefined}
                                        >
                                            {channel.value}
                                        </a>
                                    </Typography>
                                </div>
                            ))}
                        </dl>

                        <SocialLinks links={SOCIAL_LINKS} className={styles.socials} />
                        <OpenLeadCta fullWidth className={styles.cta} />
                    </div>

                    <YandexMap place={FEDERATION_PLACE} className={styles.map} />
                </div>
            </Container>
        </section>
    );
};
