import { model, models, Schema } from 'mongoose';

export interface IUser {
	name: string;
	email: string;
	username: string;
	bio?: string;
	image: string;
	location?: string;
	reputation?: number;
	portfolio?: string;
}

const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		bio: String,
		image: {
			type: String,
			default: 'https://static.productionready.io/images/smiley-cyrus.jpg',
			required: true,
		},
		location: String,
		portfolio: String,
		reputation: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const User = models?.User || model<IUser>('User', UserSchema);

export default User;
