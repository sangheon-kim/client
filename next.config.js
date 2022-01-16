/** @type {import('next').NextConfig} */
module.exports = {
  poweredByHeader: process.env.NODE_ENV === "development",
  webpack(config, options) {
    return config;
  },
  reactStrictMode: process.env.NODE_ENV === "development",
  swcMinify: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {};
  },
  images: {
    loader: "imgix",
    path: "/",
  },
};
