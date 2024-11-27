import { model, models, Schema, Types } from 'mongoose';

export interface IAccount {
	name: string;
	userId: Types.ObjectId;
	image: string;
	provider?: 'google' | 'github';
	password?: string;
	providerAccountId: string;
}

const AccountSchema = new Schema<IAccount>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		image: String,
		name: {
			type: String,
			required: true,
		},
		password: String,
		provider: {
			type: String,
			enum: ['google', 'github'],
		},
		providerAccountId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Account = models?.Account || model<IAccount>('Account', AccountSchema);

export default Account;
