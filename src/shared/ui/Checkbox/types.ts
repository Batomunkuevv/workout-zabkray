import type { InputHTMLAttributes, ReactNode } from "react";

import type { FieldTone } from "../Input/types";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> & {
    id: string;
    label: ReactNode;
    error?: string;
    tone?: FieldTone;
    className?: string;
};
