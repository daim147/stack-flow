'use server';

import { Session } from 'next-auth';
import { ZodError, ZodSchema } from 'zod';

import { auth } from '@/auth';
import connect from '@/lib/mongoose';

import { UnauthorizedError, ValidationError } from '../http-error';

type ActionOptions<T> = {
	params?: T;
	schema: ZodSchema<T>;
	authorize?: boolean;
};

/**
 * Executes an action with optional schema validation and authorization.
 *
 * @template T - The type of the parameters.
 * @param {ActionOptions<T>} options - The options for the action.
 * @param {T} options.params - The parameters for the action.
 * @param {ZodSchema<T>} [options.schema] - The schema to validate the parameters.
 * @param {boolean} [options.authorize=false] - Whether to authorize the action.
 * @returns {Promise<{ params: T; session: Session | null } | ValidationError | UnauthorizedError | Error>}
 * - The result of the action, which includes the parameters and session if authorized,
 * or an error if validation or authorization fails.
 */
async function action<T>({ params, schema, authorize = false }: ActionOptions<T>) {
	// Validate the schema
	if (schema && params) {
		try {
			schema.parse(params);
		} catch (error) {
			if (error instanceof ZodError) {
				return new ValidationError(error.flatten().fieldErrors as Record<string, string[]>);
			} else {
				return new Error('Schema Validation Error');
			}
		}
	}

	let session: Session | null = null;

	if (authorize) {
		session = await auth();
		console.log('🚀 ~ session:', session);

		if (!session) {
			return new UnauthorizedError();
		}
	}

	await connect();

	return { params, session };
}

export default action;
