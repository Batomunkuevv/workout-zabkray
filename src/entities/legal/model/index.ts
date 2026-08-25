export type {
    LegalBlock,
    LegalContext,
    LegalDocument,
    LegalDocumentMeta,
    LegalDocumentSlug,
    LegalInline,
    LegalLink,
    LegalOperator,
    LegalRequisite,
    LegalSection,
} from "./types";
export { LEGAL_DOCUMENTS, LEGAL_HREFS, LEGAL_OPERATOR, LEGAL_REVISION } from "./constants";
export {
    getLegalContext,
    getLegalDocument,
    getLegalDocumentMeta,
    getLegalRequisites,
    isLegalDocumentSlug,
} from "./helpers";
