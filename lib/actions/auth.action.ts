'use server';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import { signIn } from '@/auth';
import Account from '@/database/account.model';
import User from '@/database/user.model';
import { ActionResponse } from '@/types/global';

import action from '../handlers/action';
import handleError from '../handlers/error';
import { NotFoundError } from '../http-error';
import { SignInSchema, SignUpSchema } from '../validations';

/**
 * Signs up a user with provided credentials.
 *
 * @param {AuthCredentials} params - The authentication credentials including name, email, username, and password.
 * @returns {Promise<ActionResponse>} - The response indicating the success or failure of the sign-up process.
 *
 * The function performs the following steps:
 * 1. Validates the provided credentials against the SignUpSchema.
 * 2. Checks if a user already exists with the provided email or username.
 * 3. Hashes the password.
 * 4. Creates a new user and account within a transaction.
 * 5. Signs in the user with the provided credentials.
 * 6. Commits the transaction if successful, otherwise aborts the transaction and handles the error.
 *
 * @throws {Error} - Throws an error if the user already exists or if any other error occurs during the process.
 */
export async function signUpWithCredentials(params: AuthCredentials): Promise<ActionResponse> {
	console.log('🚀 ~ signUpWithCredentials ~ signUpWithCredentials:', params);
	const validatedResult = await action({ params, schema: SignUpSchema });

	if (validatedResult instanceof Error) {
		return handleError(validatedResult);
	}

	const { name, email, username, password } = validatedResult.params!;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const existingUser = await User.findOne({
			$or: [{ email }, { username }],
		}).session(session);
		if (existingUser) {
			throw new Error('User already exists with the provided email or username');
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const [newUser] = await User.create([{ name, email, username }], { session });

		await Account.create(
			[
				{
					userId: newUser._id,
					password: hashedPassword,
					name,
					provider: 'credentials',
					providerAccountId: email,
				},
			],
			{
				session,
			}
		);

		await session.commitTransaction();
		await signIn('credentials', { email, password, redirect: false });
		return { success: true };
	} catch (error) {
		await session.abortTransaction();
		return handleError(error);
	} finally {
		await session.endSession();
	}
}

/**
 * Signs in a user with the provided email and password credentials.
 *
 * @param params - An object containing the user's email and password.
 * @returns A promise that resolves to an ActionResponse object indicating the success or failure of the sign-in attempt.
 *
 * @throws NotFoundError - If the user or account does not exist.
 * @throws Error - If the password is invalid.
 */
export async function signInWithCredentials(
	params: Pick<AuthCredentials, 'email' | 'password'>
): Promise<ActionResponse> {
	console.log('🚀 ~ signInWithCredentials:', params);
	const validatedResult = await action({ params, schema: SignInSchema });

	if (validatedResult instanceof Error) {
		return handleError(validatedResult);
	}

	const { email, password } = validatedResult.params!;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			throw new NotFoundError('User');
		}

		const existingAccount = await Account.findOne({
			provider: 'credentials',
			providerAccountId: email,
		});

		if (!existingAccount) {
			throw new NotFoundError('Account');
		}

		const isValidPassword = await bcrypt.compare(password, existingAccount.password!);

		if (!isValidPassword) {
			throw new Error('Invalid password');
		}
		await signIn('credentials', { email, password, redirect: false });
		return { success: true };
	} catch (error) {
		return handleError(error);
	}
}
