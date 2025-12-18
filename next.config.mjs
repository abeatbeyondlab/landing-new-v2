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
}
 
export default withNextIntl(nextConfig);
