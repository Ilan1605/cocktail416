import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      // Évite l’avertissement sur les multiples lockfiles en local
      root: __dirname,
    },
  },
};

export default nextConfig;
