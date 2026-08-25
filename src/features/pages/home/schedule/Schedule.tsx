import clsx from "clsx";

import { WEEK_SCHEDULE, formatTimeRange } from "@entities/schedule";
import type { ScheduleDay, SchedulePeriod } from "@entities/schedule";
import { Container, SECTION_INSET_CLASS, SectionTag, Typography } from "@shared/ui";

import styles from "./Schedule.module.scss";

const SECTION_TEXT = "Зал открыт шесть дней в неделю: утро и вечер. Воскресенье — выходной.";

const PERIODS: { id: SchedulePeriod; title: string }[] = [
    { id: "morning", title: "Утро" },
    { id: "evening", title: "Вечер" },
];

const DayCard = ({ day }: { day: ScheduleDay }) => {
    return (
        <article className={styles.card}>
            <header className={styles.cardHead}>
                <Typography as="h3" className={styles.dayTitle}>
                    {day.title}
                </Typography>
                <span className={styles.accent} aria-hidden="true" />
            </header>

            {PERIODS.map((period) => {
                const periodSlots = day.slots.filter((slot) => slot.period === period.id);

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
                                <li key={`${day.id}-${slot.start}-${slot.end}`} className={styles.slot}>
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
    );
};

export const Schedule = () => {
    return (
        <section
            id="schedule"
            className={clsx(styles.schedule, SECTION_INSET_CLASS)}
            aria-labelledby="home-schedule-title"
        >
            <Container>
                <SectionTag className={styles.tag} aria-hidden="true">
                    Расписание
                </SectionTag>

                <header className={styles.header}>
                    <Typography id="home-schedule-title" variant="h2" className={styles.title}>
                        Расписание тренировок
                    </Typography>
                    <Typography variant="bodyLarge" className={styles.lead}>
                        {SECTION_TEXT}
                    </Typography>
                </header>

                <div className={styles.grid}>
                    {WEEK_SCHEDULE.map((day) => (
                        <DayCard key={day.id} day={day} />
                    ))}
                </div>
            </Container>
        </section>
    );
};
