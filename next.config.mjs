

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Required for Capacitor
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  output: 'standalone',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
