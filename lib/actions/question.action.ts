'use server';

import mongoose from 'mongoose';

import Question from '@/database/question.model';
import TagQuestion from '@/database/tag-question.model';
import Tag from '@/database/tag.model';

import action from '../handlers/action';
import handleError from '../handlers/error';
import { AskQuestionSchema } from '../validations';

export async function createQuestion(
	params: CreateQuestionParams
): Promise<ActionResponse<Question>> {
	const validationResult = await action({ params, schema: AskQuestionSchema, authorize: true });

	if (validationResult instanceof Error) {
		return handleError(validationResult);
	}

	const session = await mongoose.startSession();
	session.startTransaction();
	const { title, content, tags } = validationResult.params!;
	const userId = validationResult?.session?.user?.id;

	try {
		const [question] = await Question.create([{ title, content, author: userId }], { session });

		if (!question) {
			throw new Error('Question not created');
		}

		const tagIds: mongoose.Types.ObjectId[] = [];
		const tagQuestionDocuments = [];

		for (const tag of tags) {
			const existingTag = await Tag.findOneAndUpdate(
				{ name: { $regex: new RegExp(`^${tag}$`, 'i') } },
				{
					$setOnInsert: { name: tag },
					$inc: { questions: 1 },
				},
				{
					upsert: true,
					new: true,
					session,
				}
			);

			tagIds.push(existingTag._id);
			tagQuestionDocuments.push({ tag: existingTag._id, question: question._id });
		}

		await TagQuestion.insertMany(tagQuestionDocuments, { session });
		await Question.findByIdAndUpdate(
			question._id,
			{
				$push: {
					tags: {
						$each: tagIds,
					},
				},
			},
			{ session }
		);

		await session.commitTransaction();

		return { success: true, data: question.toObject() };
	} catch (error) {
		await session.abortTransaction();

		return handleError(error);
	} finally {
		await session.endSession();
	}
}
