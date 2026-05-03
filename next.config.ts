import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'thebibleworkshop.com' }],
        destination: 'https://biblespeak.org/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.thebibleworkshop.com' }],
        destination: 'https://biblespeak.org/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
