import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ROUTES from '@/constant/routes';

import { Avatar, AvatarFallback } from './ui/avatar';

interface UserAvatarProps {
	id: string;
	name: string;
	image: string;
	classNames?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ id, name, image, classNames = 'h-9 w-9' }) => {
	const initials = name
		.split(' ')
		.map((word: string) => word[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
	return (
		<Link href={ROUTES.PROFILE(id)}>
			<Avatar className={classNames}>
				{image ? (
					<Image
						src={image}
						alt={name}
						width={36}
						height={36}
						className='object-cover'
						quality={100}
					/>
				) : (
					<AvatarFallback className='primary-gradient font-space-grotesk font-bold tracking-wider text-white'>
						{initials}
					</AvatarFallback>
				)}
			</Avatar>
		</Link>
	);
};

export default UserAvatar;
