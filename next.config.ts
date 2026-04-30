import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mazinyslabtuutstgonk.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/uk/brighton',
        destination: '/uk/brighton-and-hove',
        permanent: true,
      },
      {
        source: '/uk/brighton/:slug',
        destination: '/uk/brighton-and-hove/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

