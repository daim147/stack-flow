'use server';

import mongoose from 'mongoose';

import Question from '@/database/question.model';
import TagQuestion from '@/database/tag-question.model';
import Tag, { ITagDoc } from '@/database/tag.model';

import action from '../handlers/action';
import handleError from '../handlers/error';
import { AskQuestionSchema, EditQuestionSchema, GetQuestionSchema } from '../validations';

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

		return { success: true, data: JSON.parse(JSON.stringify(question)) };
	} catch (error) {
		await session.abortTransaction();
		return handleError(error);
	} finally {
		await session.endSession();
	}
}

export async function editQuestion(params: EditQuestionParams): Promise<ActionResponse<Question>> {
	const validationResult = await action({ params, schema: EditQuestionSchema, authorize: true });

	if (validationResult instanceof Error) {
		return handleError(validationResult);
	}

	const session = await mongoose.startSession();
	session.startTransaction();
	const { title, content, tags, questionId } = validationResult.params!;
	const userId = validationResult?.session?.user?.id;

	try {
		const question = await Question.findById(questionId).populate('tags');

		if (!question) {
			throw new Error('Question not found');
		}

		if (question.author.toString() !== userId) {
			throw new Error('Unauthorized');
		}

		if (question.title !== title || question.content !== content) {
			question.title = title;
			question.content = content;
			await question.save({ session });
		}
		const tagsToRemove = question.tags.filter(
			(tag: ITagDoc) => !tags.some((t) => t.toLowerCase() === tag.name.toLowerCase())
		);
		const tagsToAdd = tags.filter(
			(tag: string) => !question.tags.some((t: ITagDoc) => t.name === tag)
		);

		const newTagDocuments = [];

		if (tagsToAdd.length) {
			for (const tag of tagsToAdd) {
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
				newTagDocuments.push({ tag: existingTag._id, question: question._id });
				question.tags.push(existingTag._id);
			}
		}

		if (tagsToRemove.length) {
			const tagIdsToRemove = tagsToRemove.map((tag: ITagDoc) => tag._id);
			await Tag.updateMany(
				{ _id: { $in: tagIdsToRemove } },
				{ $inc: { questions: -1 } },
				{ session }
			);
			await TagQuestion.deleteMany(
				{ question: question._id, tag: { $in: tagIdsToRemove } },
				{ session }
			);
			question.tags = question.tags.filter(
				(tag: mongoose.Types.ObjectId) =>
					!tagIdsToRemove.some((id: mongoose.Types.ObjectId) => id.equals(tag._id))
			);
		}

		if (newTagDocuments.length) {
			await TagQuestion.insertMany(newTagDocuments, { session });
		}

		await question.save({ session });
		await session.commitTransaction();
		return { success: true, data: JSON.parse(JSON.stringify(question)) };
	} catch (error) {
		await session.abortTransaction();
		return handleError(error);
	} finally {
		await session.endSession();
	}
}

export async function getQuestion(params: GetQuestionParams): Promise<ActionResponse<Question>> {
	const validationResult = await action({ params, schema: GetQuestionSchema, authorize: true });

	if (validationResult instanceof Error) {
		return handleError(validationResult);
	}

	const { questionId } = validationResult.params!;

	try {
		const question = await Question.findById(questionId).populate('tags');
		if (!question) {
			throw new Error('Question not found');
		}
		return { success: true, data: JSON.parse(JSON.stringify(question)) };
	} catch (error) {
		return handleError(error);
	}
}
