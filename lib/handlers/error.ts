import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { RequestError, ValidationError } from '../http-error';
import logger from '../logger';

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
		logger.error({ err: error }, `${type.toUpperCase()} Error: ${error.message}`);

		return formatResponse(type, error.statusCode, error.message, error.errors);
	} else if (error instanceof ZodError) {
		const validationError = new ValidationError(
			error.flatten().fieldErrors as Record<string, string[]>
		);
		logger.error(
			{ err: error },
			`${type.toUpperCase()} Validation Error: ${validationError.message}`
		);
		return formatResponse(
			type,
			validationError.statusCode,
			validationError.message,
			validationError.errors
		);
	} else if (error instanceof Error) {
		logger.error(error.message);
		return formatResponse(type, 500, error.message);
	}
	logger.error({ err: error }, 'An Unexpected error occurred');
	return formatResponse(type, 500, 'An Unexpected error occurred');
};

export default handleError;
