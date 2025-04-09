import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        screens: {
            lg: { max: "1639px" },
            md: { max: "1439px" },
            tb: { max: "1279px" },
            sm: { max: "767px" },
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
                    gray: "var(--general-gray)",
                    gradient: {
                        red: "var(--general-red-gradient)",
                    },
                },
            },
            fontFamily: {
                helios: ["var(--font-helios)", "sans-serif"],
                benzin: ["var(--font-benzin)", "sans-serif"],
            },
            letterSpacing: {
                default: "0.04em",
            },
            borderRadius: {
                "12": "12px",
                "24": "24px",
                "40": "40px",
            },
        },
    },
    plugins: [],
};
export default config;
