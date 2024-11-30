import { ActionResponse } from '@/types/global';

import logger from '../logger';
import handleError from './error';
import { RequestError } from '../http-error';

interface FetchOptions extends RequestInit {
	timeout?: number;
}

function isError(error: unknown): error is Error {
	return error instanceof Error;
}

export const fetchHandler = async <T>(
	url: string,
	options: FetchOptions = {}
): Promise<ActionResponse<T>> => {
	const { timeout = 5000, headers: customHeaders = {}, ...restOptions } = options;
	const controller = new AbortController();
	const { signal } = controller;
	const timeoutId = setTimeout(() => controller.abort(), timeout);
	const defaultHeaders: HeadersInit = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};
	const headers = { ...defaultHeaders, ...customHeaders };
	const config = {
		...restOptions,
		headers,
		signal,
	};

	try {
		const response = await fetch(url, config);
		clearTimeout(timeoutId);
		if (!response.ok) {
			throw new RequestError(
				response.status,
				`${response.statusText} - HTTP Error: ${response.status} `
			);
		}
		return await response.json();
	} catch (err) {
		const error = isError(err) ? err : new Error('Unknown error');

		if (error.name === 'AbortError') {
			logger.warn(`Request to ${url} timed out after ${timeout}ms`);
		} else {
			logger.error(`Error fetching ${url}`, error);
		}
		return handleError(error, 'api') as ActionResponse<T>;
	}
};
