import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LEGAL_DOCUMENTS, getLegalDocument, isLegalDocumentSlug } from "@entities/legal";
import { LegalPage } from "@features/pages";
import { SITE_NAME } from "@shared/lib/seo";
import { SectionStack } from "@shared/ui";

type LegalRouteProps = {
    params: Promise<{
        slug: string;
    }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => {
    return LEGAL_DOCUMENTS.map((document) => ({
        slug: document.slug,
    }));
};

export const generateMetadata = async ({ params }: LegalRouteProps): Promise<Metadata> => {
    const { slug } = await params;
    const document = getLegalDocument(slug);

    if (!document) {
        return {
            title: "Документ не найден",
        };
    }

    return {
        title: `${document.title} | ${SITE_NAME}`,
        description: document.description,
    };
};

const LegalDocumentPage = async ({ params }: LegalRouteProps) => {
    const { slug } = await params;

    if (!isLegalDocumentSlug(slug)) {
        notFound();
    }

    const document = getLegalDocument(slug);

    if (!document) {
        notFound();
    }

    return (
        <SectionStack offset="header">
            <LegalPage document={document} />
        </SectionStack>
    );
};

export default LegalDocumentPage;
