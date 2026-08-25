import {
    formatPlaceLabel,
    getAchievementKey,
    sortAchievements,
    type Athlete,
    type AthleteAchievement,
} from "@entities/athletes";
import { ResponsiveImage, Typography } from "@shared/ui";

import styles from "./Roster.module.scss";

type AthleteCardProps = {
    athlete: Athlete;
};

export const AthleteCard = ({ athlete }: AthleteCardProps) => {
    const achievements = sortAchievements(athlete.achievements);

    return (
        <article className={styles.card}>
            <div className={styles.media}>
                {athlete.image ? (
                    <ResponsiveImage
                        src={athlete.image}
                        alt={athlete.name}
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        wrapperClassName={styles.image}
                    />
                ) : (
                    <div className={styles.placeholder} aria-hidden="true">
                        <span className={styles.initials}>{athlete.initials}</span>
                    </div>
                )}
                <span className={styles.mediaAccent} aria-hidden="true" />
            </div>

            <div className={styles.body}>
                <div className={styles.identity}>
                    <Typography variant="h3" className={styles.name}>
                        {athlete.name}
                    </Typography>
                    {athlete.role ? (
                        <Typography as="span" className={styles.role}>
                            {athlete.role}
                        </Typography>
                    ) : null}
                </div>

                {achievements.length > 0 ? (
                    <ul className={styles.achievements}>
                        {achievements.map((achievement) => (
                            <AchievementRow key={getAchievementKey(achievement)} achievement={achievement} />
                        ))}
                    </ul>
                ) : (
                    <Typography className={styles.empty}>Протокол ещё пишется.</Typography>
                )}
            </div>
        </article>
    );
};

type AchievementRowProps = {
    achievement: AthleteAchievement;
};

const AchievementRow = ({ achievement }: AchievementRowProps) => {
    return (
        <li className={styles.achievement} data-place={achievement.place}>
            <Typography as="span" className={styles.placeBadge}>
                {formatPlaceLabel(achievement.place)}
            </Typography>
            <div className={styles.achievementBody}>
                <Typography className={styles.achievementEvent}>{achievement.event}</Typography>
                {achievement.note ? (
                    <Typography className={styles.achievementNote}>{achievement.note}</Typography>
                ) : null}
            </div>
            {achievement.year ? (
                <Typography as="span" className={styles.achievementYear}>
                    {achievement.year}
                </Typography>
            ) : null}
        </li>
    );
};
