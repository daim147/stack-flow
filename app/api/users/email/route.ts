import { NextResponse } from 'next/server';

import User from '@/database/user.model';
import handleError from '@/lib/handler/error';
import { NotFoundError, ValidationError } from '@/lib/http-error';
import connect from '@/lib/mongoose';
import { UserSchema } from '@/lib/validation';
import { APIErrorResponse } from '@/types/global';

export async function POST(request: Request) {
	try {
		await connect();
		const { email } = await request.json();
		//  validate the incoming data with the UserSchemas
		const validatedData = UserSchema.partial().safeParse({ email });
		if (!validatedData.success) {
			throw new ValidationError(validatedData.error.flatten().fieldErrors);
		}
		const user = await User.findOne({ email });
		if (!user) {
			throw new NotFoundError('User');
		}

		return NextResponse.json({ success: true, data: user }, { status: 200 });
	} catch (error) {
		return handleError(error, 'api') as APIErrorResponse;
	}
}
