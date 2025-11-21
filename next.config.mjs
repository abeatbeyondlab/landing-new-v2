/** @type {import("next").NextConfig} */
const nextConfig = {
  //output: "export", // Outputs a Single-Page Application (SPA).
  //distDir: "./dist", // Changes the build output directory to `./dist/`.
  output: "standalone", // Enable standalone output for Docker
  compress: true, // Explicitly enable gzip compression for production
  experimental: {
    optimizeCss: true, // Inlines critical CSS and defers non-critical CSS
  },
}
 
export default nextConfig
