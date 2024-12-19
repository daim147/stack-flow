import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { RequestError, ValidationError } from '../http-error';
import logger from '../logger';

/**
 * Formats a response object based on the specified response type.
 *
 * @param type - The type of response, either 'api' or another type.
 * @param status - The HTTP status code for the response.
 * @param message - A message describing the error.
 * @param errors - An optional object containing detailed error messages.
 * @returns A formatted response object. If the type is 'api', it returns a NextResponse object with JSON content and status. Otherwise, it returns an object with status and error details.
 */

export type ResponseType = 'api' | 'server';

type ReturnType<T = ResponseType> = T extends 'api' ? APIErrorResponse : ErrorResponse;

const formatResponse = <T extends ResponseType>(
	type: T,
	status: number,
	message: string,
	errors?: Record<string, string[]>
): ReturnType<T> => {
	const responseContent: ActionResponse = {
		success: false,
		error: {
			message,
			details: errors,
		},
	};

	if (type === 'api') {
		return NextResponse.json(responseContent, { status }) as ReturnType<T>;
	} else {
		return { status, ...responseContent } as ReturnType<T>;
	}
};

/**
 * Handles different types of errors and formats a response accordingly.
 *
 * @param error - The error object that needs to be handled. It can be of type `RequestError`, `ZodError`, or a generic `Error`.
 * @param type - The type of response to be formatted, typically indicating the context of the error (e.g., 'json', 'html').
 *
 * @returns A formatted response object containing the status code, error message, and any additional error details.
 */
function handleError<T extends ResponseType = 'server'>(error: unknown, type: T = 'server' as T) {
	if (error instanceof RequestError) {
		console.log('here');
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
}

export default handleError;
