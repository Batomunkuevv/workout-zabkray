import {
    LEGAL_OPERATOR,
    LEGAL_REVISION,
    getLegalRequisites,
    type LegalDocument,
} from "@entities/legal";
import { Breadcrumbs, Container, Typography } from "@shared/ui";

import { LegalInlineText } from "./LegalInlineText";

import styles from "./LegalPage.module.scss";

type LegalPageProps = {
    document: LegalDocument;
};

export const LegalPage = ({ document }: LegalPageProps) => {
    const requisites = getLegalRequisites();

    return (
        <section className={styles.page} aria-labelledby="legal-title" data-header-theme="light">
            <Container>
                <header className={styles.header}>
                    <Breadcrumbs
                        items={[
                            { label: "Главная", href: "/" },
                            { label: document.title },
                        ]}
                    />

                    <div className={styles.intro}>
                        <Typography id="legal-title" variant="h1" className={styles.title}>
                            {document.title}
                        </Typography>
                        <div className={styles.meta}>
                            <Typography as="p" variant="body" className={styles.metaItem}>
                                <span className={styles.metaLine}>
                                    <span>для сайта</span>
                                    <a
                                        href={LEGAL_OPERATOR.siteUrl}
                                        className={styles.inlineLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {LEGAL_OPERATOR.siteUrl}
                                    </a>
                                </span>
                            </Typography>
                            <Typography as="p" variant="body" className={styles.metaItem}>
                                {LEGAL_REVISION}
                            </Typography>
                        </div>
                    </div>
                </header>

                <div className={styles.content}>
                    {document.sections.map((section) => (
                        <section key={section.title} className={styles.block}>
                            <Typography as="h2" variant="bodyLarge" className={styles.sectionTitle}>
                                {section.title}
                            </Typography>
                            {section.blocks.map((block, blockIndex) => {
                                if (block.type === "ul") {
                                    return (
                                        <ul key={`${section.title}-list-${blockIndex}`} className={styles.list}>
                                            {block.items.map((item, itemIndex) => (
                                                <li key={`${section.title}-item-${itemIndex}`}>
                                                    <Typography
                                                        as="span"
                                                        variant="body"
                                                        className={styles.text}
                                                    >
                                                        <LegalInlineText
                                                            parts={item}
                                                            className={styles.inlineLink}
                                                        />
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                }

                                return (
                                    <Typography
                                        key={`${section.title}-p-${blockIndex}`}
                                        variant="body"
                                        className={styles.text}
                                    >
                                        <LegalInlineText parts={block.children} className={styles.inlineLink} />
                                    </Typography>
                                );
                            })}
                        </section>
                    ))}

                    <section className={styles.block}>
                        <Typography as="h2" variant="bodyLarge" className={styles.sectionTitle}>
                            Реквизиты оператора
                        </Typography>
                        <dl className={styles.requisites}>
                            {requisites.map((item) => (
                                <div key={item.label} className={styles.requisite}>
                                    <Typography as="dt" variant="caption" className={styles.requisiteLabel}>
                                        {item.label}
                                    </Typography>
                                    <Typography
                                        as="dd"
                                        variant="body"
                                        className={styles.requisiteValue}
                                        typograph={false}
                                    >
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className={styles.inlineLink}
                                                target={item.external ? "_blank" : undefined}
                                                rel={item.external ? "noopener noreferrer" : undefined}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            item.value
                                        )}
                                    </Typography>
                                </div>
                            ))}
                        </dl>
                    </section>
                </div>
            </Container>
        </section>
    );
};
