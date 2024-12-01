/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	// todo find a better way to do this than whitelisting everything
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "**",
			},
			{
				protocol: 'https',
				hostname: 'akash-alchemist.dev3.studio',
			}
		]
	}
};

export default nextConfig;
