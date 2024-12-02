import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

import Account from '@/database/account.model';
import User from '@/database/user.model';
import handleError from '@/lib/handler/error';
import { ValidationError } from '@/lib/http-error';
import connect from '@/lib/mongoose';
import { SignInWithOAuthSchema } from '@/lib/validation';
import { APIErrorResponse } from '@/types/global';

export async function POST(request: Request) {
	const { provider, providerAccountId, user } = await request.json();

	await connect();
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const validateData = SignInWithOAuthSchema.safeParse({ provider, providerAccountId, user });
		if (!validateData.success) {
			throw new ValidationError(validateData.error.flatten().fieldErrors);
		}

		const { name, username, email, image } = user;
		const slugifiedUsername = slugify(username, {
			lower: true,
			strict: true,
			trim: true,
		});

		let existingUser = await User.findOne({ email }).session(session);
		if (!existingUser) {
			[existingUser] = await User.create(
				[
					{
						name,
						username: slugifiedUsername,
						email,
						image,
					},
				],
				{ session }
			);
		} else {
			// Update user
			const updatedData: { name?: string; image?: string } = {};
			if (existingUser.name !== name) {
				updatedData.name = name;
			}
			if (existingUser.image !== image) {
				updatedData.image = image;
			}
			if (Object.keys(updatedData).length > 0) {
				await User.updateOne({ _id: existingUser._id }, updatedData, { session });
			}
		}

		const existingAccount = await Account.findOne({
			provider,
			providerAccountId,
			userId: existingUser._id,
		}).session(session);

		if (!existingAccount) {
			await Account.create(
				[
					{
						userId: existingUser._id,
						name,
						image,
						provider,
						providerAccountId,
					},
				],
				{ session }
			);
		}

		await session.commitTransaction();
		return NextResponse.json({ success: true });
	} catch (error) {
		await session.abortTransaction();
		return handleError(error, 'api') as APIErrorResponse;
	} finally {
		await session.endSession();
	}
}
