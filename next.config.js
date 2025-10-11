/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ftp.goit.study', pathname: '/**' },
    ],
  },
  reactStrictMode: true
};

export default nextConfig;