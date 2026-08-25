type BurgerVariant = "default" | "close";
export type BurgerTone = "light" | "dark";

export type BurgerProps = {
    className?: string;
    variant?: BurgerVariant;
    tone?: BurgerTone;
    isExpanded?: boolean;
    onClick?: () => void;
};
