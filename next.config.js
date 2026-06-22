/** @type {import('next').NextConfig} */
const nextConfig = {
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
        destination: "/",
        permanent: true,
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
        destination: "/work/elikai",
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
        source: "/projects/nektr",
        destination: "/work/nektr",
        permanent: true,
      },
      {
        source: "/projects/stlth",
        destination: "/work/stlth",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
