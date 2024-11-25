import QuestionCard from '@/components/card/QuestionCard';
import HomeFilter from '@/components/filters/HomeFilter';
import LocalSearch from '@/components/search/LocalSearch';
import { Button } from '@/components/ui/button';
import { questions } from '@/constant';
import ROUTES from '@/constant/routes';
import Link from 'next/link';

interface SearchParams {
	searchParams: Promise<{
		[key: string]: string | undefined;
	}>;
}

export default async function Home({ searchParams }: SearchParams) {
	const { query = '' } = await searchParams;
	const filteredQuestions = questions.filter((question) =>
		question.title.toLowerCase().includes(query.toLowerCase())
	);
	return (
		<>
			<section className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center '>
				<h1 className='h1-bold text-dark1p00_light900'>All Questions</h1>
				<Button asChild className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
					<Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
				</Button>
			</section>
			<section className='mt-11'>
				<LocalSearch
					route='/'
					imgSrc='/icons/search.svg'
					otherClasses='flex-1'
					placeholder='Search questions...'
				/>
			</section>
			<HomeFilter />
			<div className='mt-10 flex flex-col w-full gap-6'>
				{filteredQuestions.map((question) => (
					<QuestionCard key={question._id} question={question} />
				))}
			</div>
		</>
	);
}
