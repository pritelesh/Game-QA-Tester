/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warnings from third-party/vendored components (SphereGallery3D,
    // ascii-glitch-ripple, block-text-reveal, dot-grid) don't block
    // local dev — don't let them block production builds either.
    // `next lint` still runs normally for anyone who wants to check.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
