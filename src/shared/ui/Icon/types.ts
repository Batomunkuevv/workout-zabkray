import { ICONS } from './registry';

import type { ComponentType, SVGProps } from "react";

export type IconName = keyof typeof ICONS;
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;