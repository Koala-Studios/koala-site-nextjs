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
