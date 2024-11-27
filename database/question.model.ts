import { model, models, Schema, Types } from 'mongoose';

export interface IQuestion {
	title: string;
	content: string;
	tags: Types.ObjectId[];
	upvotes: number;
	downvotes: number;
	views: number;
	answers: number;
	author: Types.ObjectId;
}

const QuestionSchema = new Schema<IQuestion>(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Tag',
			},
		],
		upvotes: {
			type: Number,
			default: 0,
		},
		downvotes: {
			type: Number,
			default: 0,
		},
		views: {
			type: Number,
			default: 0,
		},
		answers: {
			type: Number,
			default: 0,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const Question = models?.Question || model<IQuestion>('Question', QuestionSchema);

export default Question;
