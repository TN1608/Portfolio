import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        RESEND_API_KEY: process.env.RESEND_API_KEY,
    }
  /* config options here */
};

export default nextConfig;
