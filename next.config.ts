import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    sassOptions: {
        includePaths: ["src"],
    },
};

export default nextConfig;
