/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/posts/:post", // Adjust this to match your dynamic route pattern
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=60, stale-while-revalidate",
          },
        ],
      },
      {
        source: "/categories/:category", // Adjust this to match your dynamic route pattern
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=60, stale-while-revalid",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
