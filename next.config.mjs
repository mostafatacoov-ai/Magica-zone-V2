import dns from 'node:dns';

// Force Google DNS for MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore in unsupported environments
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable unoptimized images for Hostinger & cPanel support
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;