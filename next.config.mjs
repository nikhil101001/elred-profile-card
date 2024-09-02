/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-dev.elred.io",
      },
    ],
  },
};

export default nextConfig;
