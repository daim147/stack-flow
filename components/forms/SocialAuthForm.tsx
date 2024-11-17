'use client';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import React from 'react';

import ROUTES from '@/constant/route';
import { toast } from '@/hooks/use-toast';

import { Button } from '../ui/button';

const SocialAuthForm = () => {
	const buttonClass =
		'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5 ';

	const handleClick = async (provider: 'github' | 'google') => {
		try {
			await signIn(provider, {
				callbackUrl: ROUTES.HOME,
				redirect: false,
			});
		} catch (error) {
			console.error(error);
			toast({
				title: 'Sign in failed',
				description: error instanceof Error ? error.message : 'An error occurred',
				variant: 'destructive',
			});
		}
	};

	return (
		<div className='mt-10 flex flex-wrap gap-2.5'>
			<Button className={buttonClass} onClick={() => handleClick('github')}>
				<Image
					src='/icons/github.svg'
					alt='github logo'
					width={20}
					height={20}
					className='invert-colors mr-2.5 object-contain'
				/>
				<span>Login with Github</span>
			</Button>
			<Button className={buttonClass} onClick={() => handleClick('google')}>
				<Image
					src='/icons/google.svg'
					alt='googles logo'
					width={20}
					height={20}
					className='mr-2.5 object-contain'
				/>
				<span>Login with Google</span>
			</Button>
		</div>
	);
};

export default SocialAuthForm;
