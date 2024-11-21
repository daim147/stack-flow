import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import './globals.css';

import { auth } from '@/auth';
import { Toaster } from '@/components/ui/toaster';

import ThemeProvider from '../context/Theme';

const inter = localFont({
	src: './fonts/InterVF.ttf',
	variable: '--font-inter',
	weight: '100 200 300 400 500 600 700 800 900',
});
const spaceGrotesk = localFont({
	src: './fonts/SpaceGroteskVF.ttf',
	variable: '--font-space-grotesk',
	weight: '100 200 300 400 500 600 700 800 900',
});

export const metadata: Metadata = {
	title: 'DevFlow',
	description:
		'A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.',
	icons: {
		icon: '/images/site-logo.svg',
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html suppressHydrationWarning lang='en'>
			<head>
				<link
					rel='stylesheet'
					type='text/css'
					href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
				/>
			</head>
			<SessionProvider session={session}>
				<body className={`${inter.className} ${spaceGrotesk.variable} antialiased`}>
					<ThemeProvider
						attribute='class'
						enableSystem
						defaultTheme='system'
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
					<Toaster />
				</body>
			</SessionProvider>
		</html>
	);
}
