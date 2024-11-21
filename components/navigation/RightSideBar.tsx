import { hotQuestions, popularTags } from '@/constant';
import ROUTES from '@/constant/routes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TagCard from '../card/TagCard';

const RightSideBar = () => {
	return (
		<section className='pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden'>
			<div>
				<h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
				<div className='mt-7 flex w-full flex-col gap-[30px]'>
					{hotQuestions.map(({ _id, title }) => (
						<Link
							key={_id}
							className='flex cursor-pointer items-center justify-between gap-7'
							href={ROUTES.PROFILE(_id)}
						>
							<p className='body-medium text-dark500_light700'>{title}</p>
							<Image
								className='invert-colors'
								width={20}
								height={20}
								src='/icons/chevron-right.svg'
								alt='chevron right'
							/>
						</Link>
					))}
				</div>
			</div>
			<div className='mt-16'>
				<h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
				<div className='mt-7 gap-4 flex flex-col'>
					{popularTags.map(({ _id, name, questions }) => (
						<TagCard key={_id} _id={_id} name={name} questions={questions} showCount compact />
					))}
				</div>
			</div>
		</section>
	);
};

export default RightSideBar;
