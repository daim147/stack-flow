'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { fromUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';
import { filters } from '@/constant';

const HomeFilter = () => {
	const searchParams = useSearchParams();
	const filter = searchParams.get('filter') || '';
	const router = useRouter();
	const [filterActive, setFilterActive] = useState(filter);

	const handleClick = (filter: string) => {
		let newUrl = '';
		if (filter === filterActive) {
			setFilterActive('');
			newUrl = removeKeysFromUrlQuery({
				params: searchParams.toString(),
				keys: ['filter'],
			});
		} else {
			setFilterActive(filter);
			newUrl = fromUrlQuery({
				params: searchParams.toString(),
				key: 'filter',
				value: filter,
			});
		}
		router.push(newUrl, { scroll: false });
	};

	return (
		<div className='mt-10 hidden flex-wrap gap-3 sm:flex'>
			{filters.map((filter) => (
				<Button
					key={filter.value}
					className={cn(
						`body-medium rounded-lg capitalize px-6 py-3 shadow-none`,
						filterActive === filter.value
							? 'bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400'
							: 'bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300'
					)}
					onClick={handleClick.bind(null, filter.value)}
				>
					{filter.name}
				</Button>
			))}
		</div>
	);
};

export default HomeFilter;
