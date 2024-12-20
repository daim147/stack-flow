interface SignInWithOAuthParams {
	provider: string;
	providerAccountId: string;
	user: { name: string; username: string; email: string; image: string };
}

interface AuthCredentials {
	name: string;
	email: string;
	username: string;
	password: string;
}

interface CreateQuestionParams {
	title: string;
	content: string;
	tags: string[];
}

interface EditQuestionParams extends CreateQuestionParams {
	questionId: string;
}
interface GetQuestionParams {
	questionId: string;
}
