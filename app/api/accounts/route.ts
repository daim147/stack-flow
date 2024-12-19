import { NextResponse } from 'next/server';

import Account from '@/database/account.model';
import handleError from '@/lib/handlers/error';
import { ForbiddenError } from '@/lib/http-error';
import connect from '@/lib/mongoose';
import { AccountSchema } from '@/lib/validations';

export async function GET() {
	try {
		await connect();
		const users = await Account.find();
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
		const validatedData = AccountSchema.parse(body);

		const { provider, providerAccountId } = validatedData;
		// check if the user already exists in the database by email or username
		const existingAccount = await Account.findOne({ provider, providerAccountId });
		if (existingAccount) {
			throw new ForbiddenError('Account with same provider already exists');
		}
		const account = await Account.create(validatedData);
		return NextResponse.json({ success: true, data: account }, { status: 201 });
	} catch (error) {
		return handleError(error, 'api');
	}
}
