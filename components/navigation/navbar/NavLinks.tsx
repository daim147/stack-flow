'use client';
import { SheetClose } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constant';
import ROUTES from '@/constant/routes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
	const pathname = usePathname();
	const userId = '1234';
	return (
		<>
			{sidebarLinks.map((item) => {
				const isActive =
					(pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

				if (item.route === ROUTES.PROFILE) {
					if (userId) item.route = `${item.route}/${userId}`;
					else return null;
				}
				const LinkComponent = (
					<Link
						href={item.route}
						className={cn(
							isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900',
							'flex items-center justify-start gap-4 p-4 bg-transparent'
						)}
					>
						<Image
							src={item.imgURL}
							className={cn({ 'invert-colors': !isActive })}
							alt={item.label}
							height={20}
							width={20}
						/>
						<p
							className={cn(
								isActive ? 'base-bold' : 'base-medium',
								!isMobileNav && 'max-lg:hidden'
							)}
						>
							{item.label}
						</p>
					</Link>
				);
				return isMobileNav ? (
					<SheetClose asChild key={item.label}>
						{LinkComponent}
					</SheetClose>
				) : (
					<React.Fragment key={item.label}>{LinkComponent}</React.Fragment>
				);
			})}
		</>
	);
};

export default NavLinks;
