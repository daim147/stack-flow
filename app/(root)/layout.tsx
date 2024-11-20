import React, { ReactNode } from 'react';

import Navbar from '@/components/navigation/navbar';
import LeftSideBar from '@/components/navigation/LeftSideBar';

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className='background-light850_dark100 relative'>
			<Navbar />
			<div className='flex'>
				<LeftSideBar />
				<section className='flex flex-1 min-h-screen flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
					<div className='mx-auto w-full max-w-5xl'>{children}</div>
				</section>
			</div>
		</main>
	);
};

export default RootLayout;
