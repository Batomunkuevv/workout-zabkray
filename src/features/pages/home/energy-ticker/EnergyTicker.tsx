import { Typography } from "@shared/ui";

import styles from "./EnergyTicker.module.scss";

const TICKER_ITEMS = [
    "АТЛЕТЫ ЗАБАЙКАЛЬЯ",
    "КРАЕВЫЕ СТАРТЫ",
    "ВСЕРОССИЙСКИЕ СОРЕВНОВАНИЯ",
    "НОВЫЕ РЕКОРДЫ",
    "СИЛА",
    "СКОРОСТЬ",
    "ТЕХНИКА",
    "ХАРАКТЕР",
    "РЕЗУЛЬТАТ",
] as const;

const TICKER_REPEATS = [0, 1] as const;

export const EnergyTicker = () => {
    return (
        <section className={styles.ticker} aria-label={TICKER_ITEMS.join(", ")}>
            <div className={styles.shell}>
                <div className={styles.track}>
                    {TICKER_REPEATS.map((repeat) => (
                        <ul key={repeat} className={styles.line} aria-hidden="true">
                            {TICKER_ITEMS.map((item) => (
                                <li key={`${repeat}-${item}`} className={styles.item}>
                                    <Typography as="span" variant="h3" tone="inverse" typograph={false}>
                                        {item}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
};
