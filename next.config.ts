import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: ['pino', 'pino-pretty'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'randomuser.me',
				port: '',
			},
		],
	},
};

export default nextConfig;
