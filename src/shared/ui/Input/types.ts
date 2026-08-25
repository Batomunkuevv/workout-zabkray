import type { InputHTMLAttributes, ReactNode } from "react";

export type FieldTone = "light" | "dark";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    tone?: FieldTone;
    className?: string;
    labelClassName?: string;
    /** Доп. контент справа от лейбла */
    labelAside?: ReactNode;
};
