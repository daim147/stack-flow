import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { RequestError, ValidationError } from '../http-error';

export type ResponseType = 'api' | 'server';

const formatResponse = (
	type: ResponseType,
	status: number,
	message: string,
	errors?: Record<string, string[]>
) => {
	const responseContent = {
		success: false,
		error: {
			message,
			detail: errors,
		},
	};

	return type === 'api'
		? NextResponse.json(responseContent, { status })
		: { status, ...responseContent };
};

const handleError = (error: unknown, type: ResponseType) => {
	if (error instanceof RequestError) {
		return formatResponse(type, error.statusCode, error.message, error.errors);
	} else if (error instanceof ZodError) {
		const validationError = new ValidationError(
			error.flatten().fieldErrors as Record<string, string[]>
		);
		return formatResponse(
			type,
			validationError.statusCode,
			validationError.message,
			validationError.errors
		);
	} else if (error instanceof Error) {
		return formatResponse(type, 500, error.message);
	}

	return formatResponse(type, 500, 'Internal server error');
};

export default handleError;
