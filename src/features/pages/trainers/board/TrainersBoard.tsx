import type { Trainer } from "@entities/trainers";
import { TrainerPreviewCard } from "../roster";
import { TrainersSlider } from "../slider";

import styles from "./TrainersBoard.module.scss";

type TrainersBoardProps = {
    trainers: readonly Trainer[];
    a11yLabel?: string;
};

export const TrainersBoard = ({ trainers, a11yLabel }: TrainersBoardProps) => {
    return (
        <>
            <ul className={styles.grid}>
                {trainers.map((trainer) => (
                    <li key={trainer.id}>
                        <TrainerPreviewCard trainer={trainer} showLead={false} />
                    </li>
                ))}
            </ul>

            <div className={styles.slider}>
                <TrainersSlider trainers={trainers} a11yLabel={a11yLabel} />
            </div>
        </>
    );
};
