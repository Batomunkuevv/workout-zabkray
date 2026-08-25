import type { ReactNode } from "react";

import { SectionStack } from "@shared/ui";

import styles from "./CompetitionsShell.module.scss";

type ShellProps = {
    children: ReactNode;
};

export const Shell = ({ children }: ShellProps) => {
    return <SectionStack className={styles.page}>{children}</SectionStack>;
};
