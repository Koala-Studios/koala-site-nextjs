/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    // AVIF first (smaller at the same quality), WebP for older browsers.
    formats: ["image/avif", "image/webp"],
    qualities: [80],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      // Older audit links point at the long contact form; Maya's keep their own short form.
      {
        source: "/contact",
        has: [{ type: "query", key: "interest", value: "brand-growth-audit" }],
        missing: [{ type: "query", key: "source", value: "maya" }],
        destination: "/free-audit",
        permanent: false,
      },
      {
        source: "/projects",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/projects/allo",
        destination: "/work/allo",
        permanent: true,
      },
      {
        source: "/projects/ara",
        destination: "/work/ara",
        permanent: true,
      },
      {
        source: "/projects/elikai",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/work/elikai",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/projects/magnum",
        destination: "/work/magnum",
        permanent: true,
      },
      {
        source: "/projects/mercato-di-bellina",
        destination: "/work/mercato-di-bellina",
        permanent: true,
      },
      {
        source: "/projects/unity-supplements",
        destination: "/work/unity-supplements",
        permanent: true,
      },
      {
        source: "/projects/iron-brothers",
        destination: "/work/iron-brothers",
        permanent: true,
      },
      {
        source: "/projects/bull-nutrition",
        destination: "/work/bull-nutrition",
        permanent: true,
      },
      {
        source: "/projects/whiskey-road",
        destination: "/work/whiskey-road",
        permanent: true,
      },
      {
        source: "/projects/medicrunch",
        destination: "/work/medicrunch",
        permanent: true,
      },
      {
        source: "/projects/wellth-foods",
        destination: "/work/wellth-foods",
        permanent: true,
      },
      {
        source: "/projects/freezo",
        destination: "/work/freezo",
        permanent: true,
      },
      {
        source: "/projects/hope-harvest",
        destination: "/work/hope-harvest",
        permanent: true,
      },
      {
        source: "/projects/nosh-balls",
        destination: "/work/nosh-balls",
        permanent: true,
      },
      {
        source: "/projects/nektr",
        destination: "/work/nektr",
        permanent: true,
      },
      {
        source: "/projects/stlth",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/work/stlth",
        destination: "/work",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
