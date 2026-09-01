import { Typography } from "@shared/ui";

import styles from "./TrainerQuote.module.scss";

type TrainerQuoteProps = {
    quote: string;
};

export const TrainerQuote = ({ quote }: TrainerQuoteProps) => {
    return (
        <figure className={styles.quote} data-cursor-tone="black">
            <Typography as="span" className={styles.mark} aria-hidden="true" typograph={false}>
                «
            </Typography>

            <blockquote className={styles.blockquote}>
                <Typography as="p" variant="h3" tone="inverse" className={styles.text}>
                    {quote}
                </Typography>
            </blockquote>
        </figure>
    );
};
