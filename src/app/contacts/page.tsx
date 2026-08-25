import type { Metadata } from "next";

import { ContactsPage } from "@features/pages";
import { getLocalBusinessJsonLd } from "@shared/lib/seo";
import { JsonLd, SectionStack } from "@shared/ui";

export const metadata: Metadata = {
    title: "Контакты | Федерация воркаута Забайкальского края",
    description:
        "Контакты Федерации воркаута Забайкальского края: телефон, почта и зал в Чите. Как связаться и как добраться.",
};

const Contacts = () => {
    return (
        <>
            <JsonLd data={getLocalBusinessJsonLd()} />
            <SectionStack offset="header">
                <ContactsPage.Contacts />
            </SectionStack>
        </>
    );
};

export default Contacts;
