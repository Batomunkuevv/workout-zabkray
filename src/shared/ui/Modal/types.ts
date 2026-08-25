import type { ReactNode } from "react";

export type ModalAlign = "start" | "center";

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    titleId?: string;
    description?: string;
    descriptionId?: string;
    children?: ReactNode;
    className?: string;
    /** Доп. класс на панель диалога */
    panelClassName?: string;
    /** Выравнивание заголовка и описания */
    align?: ModalAlign;
    /** Скрыть кнопку закрытия */
    hideCloseButton?: boolean;
};
