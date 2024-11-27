class RequestError extends Error {
	statusCode: number;
	errors?: Record<string, string[]>;

	constructor(statusCode: number, message: string, errors?: Record<string, string[]>) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
		this.name = 'RequestError';
	}
}

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
			if (errors[0] === 'required') {
				return `${fieldName} is required`;
			} else {
				return errors.join(' and ');
			}
		});

		return formattedMessage.join(', ');
	}
}
class NotFoundError extends RequestError {
	constructor(resource: string) {
		super(404, `${resource} not found`);
		this.name = 'NotFoundError';
	}
}

class UnauthorizedError extends RequestError {
	constructor(message = 'Unauthorized') {
		super(401, message);
		this.name = 'UnauthorizedError';
	}
}

class ForbiddenError extends RequestError {
	constructor(message = 'Forbidden') {
		super(403, message);
		this.name = 'ForbiddenError';
	}
}

class ConflictError extends RequestError {
	constructor(message = 'Conflict') {
		super(409, message);
		this.name = 'ConflictError';
	}
}

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
