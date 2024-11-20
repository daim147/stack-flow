import ROUTES from './routes';

export enum FORM_TYPES {
	SIGN_IN = 'SIGN_IN',
	SIGN_UP = 'SIGN_UP',
}

export const sidebarLinks = [
	{
		imgURL: '/icons/home.svg',
		route: ROUTES.HOME,
		label: 'Home',
	},
	{
		imgURL: '/icons/users.svg',
		route: ROUTES.COMMUNITY,
		label: 'Community',
	},
	{
		imgURL: '/icons/star.svg',
		route: ROUTES.COLLECTION,
		label: 'Collections',
	},
	{
		imgURL: '/icons/suitcase.svg',
		route: ROUTES.JOBS,
		label: 'Find Jobs',
	},
	{
		imgURL: '/icons/tag.svg',
		route: ROUTES.TAGS,
		label: 'Tags',
	},
	{
		imgURL: '/icons/user.svg',
		route: ROUTES.PROFILE,
		label: 'Profile',
	},
	{
		imgURL: '/icons/question.svg',
		route: ROUTES.ASK_QUESTION,
		label: 'Ask a question',
	},
];

export const hotQuestions = [
	{ _id: '1', title: 'How to create a custom hook in React?' },
	{ _id: '2', title: 'How to use React Query?' },
	{ _id: '3', title: 'How to use Redux?' },
	{ _id: '4', title: 'How to use React Router?' },
	{ _id: '5', title: 'How to use React Context?' },
];

export const popularTags = [
	{ _id: '1', name: 'react', questions: 100 },
	{ _id: '2', name: 'javascript', questions: 200 },
	{ _id: '3', name: 'typescript', questions: 150 },
	{ _id: '4', name: 'nextjs', questions: 50 },
	{ _id: '5', name: 'react-query', questions: 75 },
];
