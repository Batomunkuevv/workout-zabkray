import type { ReactNode, TextareaHTMLAttributes } from "react";

import type { FieldTone } from "../Input/types";

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    tone?: FieldTone;
    className?: string;
    labelClassName?: string;
    labelAside?: ReactNode;
};
