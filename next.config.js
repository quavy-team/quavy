const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const withPWA = require("next-pwa")

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    dest: "public", disable: process.env.NODE_ENV === "development"
  },
  plugins: [new BundleAnalyzerPlugin()],
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      })
    }

    return config
  },
})
