import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploads.mangadex.org',
        port: '',
        pathname: '/covers/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '**.mangadex.network',
        port: '',
        pathname: '/data/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
