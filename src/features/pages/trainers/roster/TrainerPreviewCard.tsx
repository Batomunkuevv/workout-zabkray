import Link from "next/link";

import { getTrainerHref, type Trainer } from "@entities/trainers";
import { Icon, ResponsiveImage, Typography } from "@shared/ui";

import styles from "./TrainerPreviewCard.module.scss";

type TrainerPreviewCardProps = {
    trainer: Trainer;
    priority?: boolean;
    showLead?: boolean;
};

export const TrainerPreviewCard = ({
    trainer,
    priority = false,
    showLead = true,
}: TrainerPreviewCardProps) => {
    const href = getTrainerHref(trainer.id);

    return (
        <article className={styles.card}>
            <Link href={href} className={styles.link}>
                <div className={styles.media}>
                    <ResponsiveImage
                        src={trainer.image}
                        alt={`${trainer.name} — ${trainer.role} в Чите`}
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        priority={priority}
                        wrapperClassName={styles.image}
                    />
                    <span className={styles.accent} aria-hidden="true" />
                </div>

                <div className={styles.body}>
                    <Typography as="span" className={styles.role}>
                        {trainer.role}
                    </Typography>
                    <Typography variant="h3" className={styles.name}>
                        {trainer.name}
                    </Typography>
                    {showLead ? <Typography className={styles.lead}>{trainer.lead}</Typography> : null}
                    <span className={styles.more}>
                        Профиль
                        <Icon name="arrowUpRight" className={styles.moreIcon} />
                    </span>
                </div>
            </Link>
        </article>
    );
};
