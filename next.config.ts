import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/v1/:path*",
				destination: "https://ecoforge-api.onrender.com/api/v1",
			},
		];
	},
};

export default nextConfig;
