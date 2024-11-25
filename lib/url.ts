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
export const fromUrlQuery = ({ params, key, value }: FromUrlQuery) => {
	const query = qs.parse(params);
	query[key] = value;
	return qs.stringifyUrl({
		url: window.location.pathname,
		query,
	});
};

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
