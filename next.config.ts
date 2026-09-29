import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash — currently used for hotel images
      { protocol: 'https', hostname: 'images.unsplash.com' },

      // (Optional) Future-ready hosts — চাইলে বাদ দিতে পারেন
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
};

export default nextConfig;