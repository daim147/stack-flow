import { NextResponse } from 'next/server';

import Account from '@/database/account.model';
import handleError from '@/lib/handler/error';
import { NotFoundError, ValidationError } from '@/lib/http-error';
import connect from '@/lib/mongoose';
import { AccountSchema } from '@/lib/validation';
import { APIErrorResponse } from '@/types/global';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	if (!id) throw new NotFoundError('User');

	try {
		connect();
		const account = await Account.findById(id);
		if (!account) throw new NotFoundError('Account');

		return NextResponse.json({ success: true, data: account }, { status: 200 });
	} catch (error) {
		return handleError(error, 'api') as APIErrorResponse;
	}
}

export async function Delete(_: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	if (!id) throw new NotFoundError('User');

	try {
		connect();
		const account = await Account.findByIdAndDelete(id);
		if (!account) throw new NotFoundError('Account');

		return NextResponse.json({ success: true, data: account }, { status: 200 });
	} catch (error) {
		return handleError(error, 'api') as APIErrorResponse;
	}
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	if (!id) throw new NotFoundError('Account');

	try {
		await connect();
		const body = await request.json();
		const validateData = AccountSchema.safeParse(body);
		if (!validateData.success) {
			throw new ValidationError(validateData.error.flatten().fieldErrors);
		}
		const account = await Account.findByIdAndUpdate(id, validateData, { new: true });
		if (!account) throw new NotFoundError('User');

		return NextResponse.json({ success: true, data: account }, { status: 200 });
	} catch (error) {
		return handleError(error, 'api') as APIErrorResponse;
	}
}
