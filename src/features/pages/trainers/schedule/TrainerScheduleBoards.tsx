import { SCHEDULE_PERIODS, formatDayShorts, formatTimeRange } from "@entities/schedule";
import type { Trainer } from "@entities/trainers";
import { Typography } from "@shared/ui";

import styles from "./TrainerScheduleBoards.module.scss";

type TrainerScheduleBoardsProps = {
    trainer: Trainer;
    className?: string;
};

export const TrainerScheduleBoards = ({ trainer, className }: TrainerScheduleBoardsProps) => {
    return (
        <div className={className ?? styles.boards}>
            {trainer.schedule.map((group) => (
                <article key={group.id} className={styles.board}>
                    <header className={styles.boardHead}>
                        <Typography as="h3" className={styles.boardTitle}>
                            {formatDayShorts(group.days)}
                        </Typography>
                        <span className={styles.accent} aria-hidden="true" />
                    </header>

                    {SCHEDULE_PERIODS.map((period) => {
                        const periodSlots = group.slots.filter((slot) => slot.period === period.id);

                        if (periodSlots.length === 0) {
                            return null;
                        }

                        return (
                            <div key={period.id} className={styles.period}>
                                <Typography as="p" className={styles.periodTitle}>
                                    {period.title}
                                </Typography>
                                <ol className={styles.slots}>
                                    {periodSlots.map((slot) => (
                                        <li
                                            key={`${group.id}-${slot.start}-${slot.end}`}
                                            className={styles.slot}
                                        >
                                            <Typography
                                                as="time"
                                                className={styles.time}
                                                dateTime={`${slot.start}/${slot.end}`}
                                            >
                                                {formatTimeRange(slot.start, slot.end)}
                                            </Typography>
                                            {slot.note ? (
                                                <Typography as="span" tone="inverse" className={styles.note}>
                                                    {slot.note.label}
                                                </Typography>
                                            ) : null}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        );
                    })}
                </article>
            ))}
        </div>
    );
};
