import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI must be provided');
}

interface MongooseCache {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

declare global {
	var mongooseCache: MongooseCache;
}

let cache = global.mongooseCache;

if (!cache) {
	cache = global.mongooseCache = { conn: null, promise: null };
}

const connect = async (): Promise<Mongoose> => {
	if (cache.conn) {
		return cache.conn;
	}
	if (!cache.promise) {
		cache.promise = mongoose
			.connect(MONGODB_URI, {
				dbName: 'devflow',
			})
			.then((result) => {
				console.log('Connected to MongoDB');
				return result;
			})
			.catch((error) => {
				console.log('Error connecting to MongoDB');
				console.log(error);
				throw error;
			});
	}
	cache.conn = await cache.promise;
	return cache.conn;
};

export default connect;
