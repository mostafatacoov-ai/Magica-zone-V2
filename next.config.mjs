import dns from 'node:dns';

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore in unsupported environments
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,

  // Flatten chunk filenames so Apache never encounters %5Blang%5D bracket folders
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.chunkFilename = 'static/chunks/[name]-[contenthash].js';
    }
    return config;
  },
};

export default nextConfig;