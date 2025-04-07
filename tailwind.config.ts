import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        screens: {
            lg: { max: "1885px" },
            md: { max: "1419px" },
            tb: { max: "992px" },
            sm: { max: "760px" },
            s: { max: "576px" },
            xs: { max: "359px" },
        },
        extend: {
            colors: {
                t: {
                    white: "var(--text-white)",
                    black: "var(--text-black)",
                },
                b: {
                    primary: "var(--border-primary)",
                },
                g: {
                    black: "var(--general-black)",
                    gradient: {
                        red: "var(--general-red-gradient)",
                    },
                },
            },
            fontFamily: {
                helios: "var(--font-helios)",
                benzin: "var(--font-benzin)",
            },
        },
    },
    plugins: [],
};
export default config;
