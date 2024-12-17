/**
 * Represents an error that occurs during an HTTP request.
 *
 * @extends {Error}
 */
class RequestError extends Error {
	/**
	 * The HTTP status code associated with the error.
	 */
	statusCode: number;

	/**
	 * Optional detailed errors associated with the request.
	 */
	errors?: Record<string, string[]>;

	/**
	 * Creates an instance of RequestError.
	 *
	 * @param {number} statusCode - The HTTP status code.
	 * @param {string} message - The error message.
	 * @param {Record<string, string[]>} [errors] - Optional detailed errors.
	 */
	constructor(statusCode: number, message: string, errors?: Record<string, string[]>) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
		this.name = 'RequestError';
	}
}

/**
 * Represents a validation error that occurs during a request.
 * Extends the `RequestError` class.
 *
 * @class ValidationError
 * @extends {RequestError}
 *
 * @param {Record<string, string[]>} fieldErrors - An object containing field names as keys and an array of error messages as values.
 *
 * @property {string} name - The name of the error, set to 'ValidationError'.
 * @property {Record<string, string[]>} errors - The field errors passed to the constructor.
 *
 * @method static formatFieldErrors
 * @memberof ValidationError
 * @static
 * @param {Record<string, string[]>} fieldErrors - An object containing field names as keys and an array of error messages as values.
 * @returns {string} A formatted error message string.
 */
class ValidationError extends RequestError {
	constructor(fieldErrors: Record<string, string[]>) {
		const message = ValidationError.formatFieldErrors(fieldErrors);
		super(400, message, fieldErrors);
		this.name = 'ValidationError';
		this.errors = fieldErrors;
	}

	static formatFieldErrors(fieldErrors: Record<string, string[]>): string {
		const formattedMessage = Object.entries(fieldErrors).map(([field, errors]) => {
			const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
			if (errors[0].toLowerCase() === 'required') {
				return `${fieldName} is required`;
			} else {
				return errors.join(' and ');
			}
		});

		return formattedMessage.join(', ');
	}
}
/**
 * Represents an error when a requested resource is not found.
 * Extends the `RequestError` class with a 404 status code and a custom message.
 *
 * @class NotFoundError
 * @extends {RequestError}
 * @param {string} resource - The name or identifier of the resource that was not found.
 */
class NotFoundError extends RequestError {
	constructor(resource: string) {
		super(404, `${resource} not found`);
		this.name = 'NotFoundError';
	}
}

/**
 * Represents an error when a request is unauthorized.
 *
 * @extends {RequestError}
 *
 * @example
 * throw new UnauthorizedError();
 *
 * @example
 * throw new UnauthorizedError('Custom unauthorized message');
 *
 * @param {string} [message='Unauthorized'] - Optional custom error message.
 */
class UnauthorizedError extends RequestError {
	constructor(message = 'Unauthorized') {
		super(401, message);
		this.name = 'UnauthorizedError';
	}
}

/**
 * Represents an error when a request is forbidden.
 *
 * @extends {RequestError}
 *
 * @example
 * throw new ForbiddenError('You do not have permission to access this resource.');
 *
 * @param {string} [message='Forbidden'] - The error message.
 */
class ForbiddenError extends RequestError {
	constructor(message = 'Forbidden') {
		super(403, message);
		this.name = 'ForbiddenError';
	}
}

/**
 * Represents an HTTP 409 Conflict error.
 * This error is typically used when a request could not be processed because of a conflict in the request.
 *
 * @extends {RequestError}
 */
class ConflictError extends RequestError {
	constructor(message = 'Conflict') {
		super(409, message);
		this.name = 'ConflictError';
	}
}

/**
 * Represents an internal server error (HTTP 500).
 * This error is thrown when the server encounters an unexpected condition
 * that prevents it from fulfilling the request.
 *
 * @extends {RequestError}
 */
class InternalServerError extends RequestError {
	constructor(message = 'Internal server error') {
		super(500, message);
		this.name = 'InternalServerError';
	}
}

export {
	RequestError,
	ValidationError,
	NotFoundError,
	UnauthorizedError,
	ForbiddenError,
	ConflictError,
	InternalServerError,
};
