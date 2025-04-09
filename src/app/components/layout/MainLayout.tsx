import { LayoutProps } from "@/types";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col overflow-clip min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};
