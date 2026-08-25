import { JSX } from "react";
import parse from "html-react-parser";
import Typograf from "typograf";

import { TypographProps } from "./types";

export class SiteTypograf extends Typograf {
    constructor() {
        super({ locale: ["ru", "en-US"] });
    }

    private static readonly shared = new SiteTypograf();

    static html(input: string): string {
        return this.shared.execute(input);
    }
}

export const typographHtml = (input: string): string => SiteTypograf.html(input);

export const Typograph = ({ html }: TypographProps): JSX.Element => {
    return <>{parse(SiteTypograf.html(html))}</>;
};
