/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['api.hishabx.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.hishabx.io',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
}

module.exports = nextConfig 