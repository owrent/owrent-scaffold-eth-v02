import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";
import type { NextConfig } from "next";

// Check if Civic Client ID is configured
const clientId = process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || "";

// Log warning in development if Client ID is missing
if (!clientId && process.env.NODE_ENV === "development") {
  console.warn(
    "⚠️  NEXT_PUBLIC_CIVIC_CLIENT_ID is not set. " +
      "Get your Client ID from https://auth.civic.com to enable authentication.",
  );
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

const isIpfs = process.env.NEXT_PUBLIC_IPFS_BUILD === "true";

if (isIpfs) {
  nextConfig.output = "export";
  nextConfig.trailingSlash = true;
  nextConfig.images = {
    unoptimized: true,
  };
}

// Create Civic Auth plugin with client ID from environment variable
const withCivicAuth = createCivicAuthPlugin({
  clientId,
});

// Chain Civic Auth plugin with existing Next.js configuration
module.exports = withCivicAuth(nextConfig);
