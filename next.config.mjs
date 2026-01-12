import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import("next").NextConfig} */
const nextConfig = {
  //output: "export", // Outputs a Single-Page Application (SPA).
  //distDir: "./dist", // Changes the build output directory to `./dist/`.
  output: "standalone", // Enable standalone output for Docker
  compress: true, // Explicitly enable gzip compression for production
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false, // Inlines critical CSS and defers non-critical CSS
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-api-key" },
        ]
      }
    ]
  }
}
 
export default withNextIntl(nextConfig);
