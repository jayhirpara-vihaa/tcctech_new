const { i18n } = require("./next-i18next.config");
const runtimeCaching = require("next-pwa/cache");
const withVideos = require("next-videos");

module.exports = withVideos();
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
  runtimeCaching,
  maximumFileSizeToCacheInBytes: 3000000000,
});

module.exports = withPWA({
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 120,
  images: {
    domains: [
      "dr2mfr65joexd.cloudfront.net",
      "d2yhu6nvl7lle6.cloudfront.net",
      "css.brilliantearth.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
