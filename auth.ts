import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { IAccountDoc } from './database/account.model';
import { IUserDoc } from './database/user.model';
import { api } from './lib/api';
import { SignInSchema } from './lib/validations';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GitHub,
		Google,
		Credentials({
			async authorize(credentials) {
				// console.log('🚀 ~ authorize ~ credentials:', credentials);
				const validateFields = SignInSchema.safeParse(credentials);
				if (validateFields.success) {
					const { email, password } = validateFields.data;
					const { data: existingAccount } = (await api.accounts.getByProvider(
						email
					)) as ActionResponse<IAccountDoc>;

					if (!existingAccount) {
						return null;
					}

					const { data: existingUser } = (await api.users.getById(
						existingAccount.userId.toString()
					)) as ActionResponse<IUserDoc>;

					if (!existingUser) return null;

					const isValidPassword = await bcrypt.compare(password, existingAccount.password!);

					if (isValidPassword) {
						return {
							id: existingUser.id,
							name: existingUser.name,
							email: existingUser.email,
							image: existingUser.image,
						};
					}
				}
				return null;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			// console.log('🚀 ~ session ~ session, token:', session, token);
			session.user.id = token.sub as string;
			return session;
		},
		async jwt({ account, token }) {
			// console.log('🚀 ~ jwt ~ account, token:', account, token);
			if (account) {
				const { data: existingAccount, success } = (await api.accounts.getByProvider(
					account.type === 'credentials' ? token.email! : account.providerAccountId
				)) as ActionResponse<IAccountDoc>;
				if (!success || !existingAccount) return token;
				const userId = existingAccount.userId.toString();
				if (userId) {
					token.sub = userId;
				}
			}
			return token;
		},
		async signIn({ user, account, profile }) {
			// console.log('🚀 ~ signIn ~ user, account, profile:', user, account, profile);
			if (account?.type === 'credentials') return true;
			if (!account || !user || !profile) return false;

			const userInfo = {
				name: user.name!,
				email: user.email!,
				image: user.image!,
				username:
					account.provider === 'github'
						? (profile.login as string)
						: (user.name?.toLowerCase() as string),
			};

			const { success } = (await api.auth.signInWithOAuth({
				user: userInfo,
				provider: account.provider,
				providerAccountId: account.providerAccountId,
			})) as ActionResponse;
			return success;
		},
	},
});
