/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fluentie-bucket.sfo3.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },
  
};

module.exports = nextConfig;
