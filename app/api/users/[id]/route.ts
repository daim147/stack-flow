import { NextResponse } from 'next/server';

import User from '@/database/user.model';
import handleError from '@/lib/handler/error';
import { NotFoundError } from '@/lib/http-error';
import connect from '@/lib/mongoose';
import { UserSchema } from '@/lib/validation';
import { APIErrorResponse } from '@/types/global';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	if (!id) throw new NotFoundError('User');

	try {
		connect();
		const user = await User.findById(id);
		if (!user) throw new NotFoundError('User');

		return NextResponse.json({ success: true, data: user }, { status: 200 });
	} catch (error) {
		return handleError(error, 'api') as APIErrorResponse;
	}
}

export async function Delete(_: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	if (!id) throw new NotFoundError('User');

	try {
		connect();
		const user = await User.findByIdAndDelete(id);
		if (!user) throw new NotFoundError('User');

		return NextResponse.json({ success: true, data: user }, { status: 200 });
	} catch (error) {
		return handleError(error, 'api') as APIErrorResponse;
	}
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	if (!id) throw new NotFoundError('User');

	try {
		await connect();
		const body = await request.json();
		const validateData = UserSchema.partial().parse(body);
		const user = await User.findByIdAndUpdate(id, validateData, { new: true });
		if (!user) throw new NotFoundError('User');

		return NextResponse.json({ success: true, data: user }, { status: 200 });
	} catch (error) {
		return handleError(error, 'api') as APIErrorResponse;
	}
}
