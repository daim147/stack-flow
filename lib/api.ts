import { IAccount } from '@/database/account.model';
import { IUser } from '@/database/user.model';

import { fetchHandler } from './handler/fetch';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const api = {
	auth: {
		signInWithOAuth: (data: SignInWithOAuthParams) =>
			fetchHandler(`${API_BASE_URL}/auth/signin-with-oauth`, {
				method: 'POST',
				body: JSON.stringify(data),
			}),
	},
	users: {
		getAll: () => fetchHandler(`${API_BASE_URL}/users`),
		getById: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`),
		getByEmail: (email: string) =>
			fetchHandler(`${API_BASE_URL}/users/email`, {
				method: 'POST',
				body: JSON.stringify({ email }),
			}),
		create: (data: Partial<IUser>) =>
			fetchHandler(`${API_BASE_URL}/users`, {
				method: 'POST',
				body: JSON.stringify(data),
			}),

		update: (id: string, data: Partial<IUser>) =>
			fetchHandler(`${API_BASE_URL}/users/${id}`, {
				method: 'PUT',
				body: JSON.stringify(data),
			}),
		delete: (id: string) =>
			fetchHandler(`${API_BASE_URL}/users/${id}`, {
				method: 'DELETE',
			}),
	},
	accounts: {
		getAll: () => fetchHandler(`${API_BASE_URL}/accounts`),
		getById: (id: string) => fetchHandler(`${API_BASE_URL}/accounts/${id}`),
		getByProvider: (providerAccountId: string) =>
			fetchHandler(`${API_BASE_URL}/accounts/provider`, {
				method: 'POST',
				body: JSON.stringify({ providerAccountId }),
			}),
		create: (data: Partial<IAccount>) =>
			fetchHandler(`${API_BASE_URL}/accounts`, {
				method: 'POST',
				body: JSON.stringify(data),
			}),

		update: (id: string, data: Partial<IAccount>) =>
			fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
				method: 'PUT',
				body: JSON.stringify(data),
			}),
		delete: (id: string) =>
			fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
				method: 'DELETE',
			}),
	},
};
