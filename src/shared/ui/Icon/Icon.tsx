import clsx from "clsx";
import type { ComponentType, SVGProps } from "react";

import { ICONS } from "./registry";
import type { IconName } from "./types";

export type IconProps = {
    name: IconName;
    className?: string;
    title?: string;
    decorative?: boolean; // по умолчанию true
} & Omit<SVGProps<SVGSVGElement>, "children">;

export const Icon = ({ name, className, title, decorative = true, ...svgProps }: IconProps) => {
    const Svg = ICONS[name] as ComponentType<SVGProps<SVGSVGElement>>;

    if (!Svg) {
        throw new Error(`Icon: unknown name "${String(name)}"`);
    }

    return (
        <Svg
            className={clsx(className)}
            aria-hidden={decorative ? true : undefined}
            role={decorative ? "presentation" : "img"}
            {...(!decorative && title ? { "aria-label": title } : {})}
            focusable="false"
            {...svgProps}
        />
    );
};
