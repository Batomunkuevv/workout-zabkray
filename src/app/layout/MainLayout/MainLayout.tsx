import { Header } from "@layout/Header";
import { Footer } from "@layout/Footer";

import { LeadModalProvider } from "@features/leads";
import { SmoothHashScroll } from "@shared/lib";
import type { LayoutProps } from "@shared/types";

import styles from "./MainLayout.module.scss";

export const MainLayout = ({ children }: LayoutProps) => {
    return (
        <LeadModalProvider>
            <div className={styles["site-wrapper"]}>
                <SmoothHashScroll />
                <Header />
                <main className={styles.page}>{children}</main>
                <Footer />
            </div>
        </LeadModalProvider>
    );
};
