import { model, models, Schema, Types } from 'mongoose';

export interface IInteraction {
	user: Types.ObjectId;
	action: string;
	actionId: Types.ObjectId;
	actionType: 'question' | 'answer';
}

const InteractionSchema = new Schema<IInteraction>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		action: {
			type: String,
			required: true,
			// enum: ['upvote', 'downvote', 'bookmark', 'view', 'answer', 'question'],
		},
		actionId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		actionType: {
			type: String,
			required: true,
			enum: ['question', 'answer'],
		},
	},
	{ timestamps: true }
);

const Interaction = models?.Interaction || model<IInteraction>('Interaction', InteractionSchema);

export default Interaction;
