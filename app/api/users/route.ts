import { NextResponse } from 'next/server';

import User from '@/database/user.model';
import handleError from '@/lib/handlers/error';
import { ValidationError } from '@/lib/http-error';
import connect from '@/lib/mongoose';
import { UserSchema } from '@/lib/validations';

export async function GET() {
	try {
		await connect();
		const users = await User.find();
		return NextResponse.json({ success: true, data: users }, { status: 200 });
	} catch (error) {
		return handleError(error, 'api');
	}
}

export async function POST(response: Response) {
	try {
		await connect();
		const body = await response.json();
		//  validate the incoming data with the UserSchemas
		const validatedData = UserSchema.safeParse(body);
		if (!validatedData.success) {
			throw new ValidationError(validatedData.error.flatten().fieldErrors);
		}
		const { email, username } = validatedData.data;
		// check if the user already exists in the database by email or username
		const existingUser = await User.findOne({ $or: [{ email }, { username }] });
		if (existingUser) {
			throw new Error('User already exists');
		}
		const user = new User(validatedData.data);
		await user.save();
		return NextResponse.json({ success: true, data: user }, { status: 201 });
	} catch (error) {
		return handleError(error, 'api');
	}
}
