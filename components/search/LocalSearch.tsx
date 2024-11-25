'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fromUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';

interface Props {
	route: string;
	imgSrc: string;
	otherClasses?: string;
	placeholder: string;
}

const LocalSearch = ({ route, imgSrc, otherClasses, placeholder }: Props) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const query = searchParams.get('query') || '';
	const [searchQuery, setSearchQuery] = useState(query);
	console.log('🚀 ~ LocalSearch ~ searchQuery:', searchQuery);

	const updateUrl = useCallback(() => {
		if (searchQuery.trim()) {
			const newUrl = fromUrlQuery({
				params: searchParams.toString(),
				key: 'query',
				value: searchQuery,
			});
			router.push(newUrl, { scroll: false });
		} else {
			if (pathname === route) {
				const newUrl = removeKeysFromUrlQuery({
					params: searchParams.toString(),
					keys: ['query'],
				});
				router.push(newUrl, { scroll: false });
			}
		}
	}, [searchQuery, searchParams, pathname, route, router]);

	useEffect(() => {
		const debounced = setTimeout(() => {
			updateUrl();
		}, 1000);
		return () => clearTimeout(debounced);
	}, [searchQuery, updateUrl]);

	return (
		<div
			className={`background-light800_darkgradient flex min-h-[56px] grow gap-4 items-center px-4 rounded-[10px] ${otherClasses}`}
		>
			<label htmlFor='search'>
				<Image src={imgSrc} alt='search' width={24} height={24} className='cursor-pointer' />
			</label>
			<Input
				placeholder={placeholder}
				type='text'
				id='search'
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className='paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none'
			/>
		</div>
	);
};

export default LocalSearch;
