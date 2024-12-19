import logger from '../logger';
import handleError from './error';
import { RequestError } from '../http-error';

interface FetchOptions extends RequestInit {
	timeout?: number;
	headers?: Record<string, string>;
}

function isError(error: unknown): error is Error {
	return error instanceof Error;
}

/**
 * Fetch handler to make HTTP requests with a timeout and custom headers.
 *
 * @template T - The expected response type.
 * @param {string} url - The URL to fetch.
 * @param {FetchOptions} [options={}] - Optional fetch options.
 * @param {number} [options.timeout=5000] - Timeout for the request in milliseconds.
 * @param {HeadersInit} [options.headers] - Custom headers for the request.
 * @param {RequestInit} [options.restOptions] - Other fetch options.
 * @returns {Promise<ActionResponse<T>>} - The response data.
 * @throws {RequestError} - Throws an error if the response is not ok.
 * @throws {Error} - Throws an error if an unknown error occurs.
 */
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
		return handleError(error, 'api');
	}
};
