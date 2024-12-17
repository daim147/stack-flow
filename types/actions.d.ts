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
