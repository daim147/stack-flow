import qs from 'query-string';

interface FromUrlQuery {
	params: string;
	key: string;
	value: string;
}

interface RemoveKeysFromUrlQuery {
	params: string;
	keys: string[];
}
/**
 * Constructs a URL with updated query parameters.
 *
 * @param params - The current URL query parameters as a string.
 * @param key - The key of the query parameter to update.
 * @param value - The value to set for the specified query parameter key.
 * @returns The updated URL with the new query parameters.
 */
export const fromUrlQuery = ({ params, key, value }: FromUrlQuery) => {
	const query = qs.parse(params);
	query[key] = value;
	return qs.stringifyUrl({
		url: window.location.pathname,
		query,
	});
};

/**
 * Removes specified keys from the URL query parameters.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.params - The URL query string to parse and modify.
 * @param {string[]} params.keys - The keys to remove from the query string.
 * @returns {string} - The modified URL with the specified keys removed from the query string.
 */
export const removeKeysFromUrlQuery = ({ params, keys }: RemoveKeysFromUrlQuery) => {
	const query = qs.parse(params);

	keys.forEach((key) => {
		delete query[key];
	});
	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query,
		},
		{ skipEmptyString: true, skipNull: true }
	);
};
