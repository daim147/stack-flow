const ROUTES = {
	HOME: '/',
	SIGN_IN: '/sign-in',
	SIGN_UP: '/sign-up',
	COMMUNITY: '/community',
	COLLECTION: '/collection',
	JOBS: '/find-jobs',
	TAGS: (id: string) => `/tags/${id}`,
	PROFILE: (id: string) => `/profile/${id}`,
	QUESTION: (id: string) => `/question/${id}`,
	ASK_QUESTION: '/ask-question',
};

export default ROUTES;
