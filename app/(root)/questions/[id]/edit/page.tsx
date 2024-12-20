import { notFound, redirect } from 'next/navigation';
import React from 'react';

import { auth } from '@/auth';
import QuestionForm from '@/components/forms/QuestionForm';
import ROUTES from '@/constant/routes';
import { getQuestion } from '@/lib/actions/question.action';

const EditQuestion = async ({ params }: RouteParams) => {
	const { id } = await params;
	if (!id) {
		console.error('Question Id not found');
		return notFound();
	}
	const session = await auth();
	if (!session) {
		return redirect(ROUTES.SIGN_IN);
	}

	const { data: question, success } = await getQuestion({ questionId: id });
	if (!success) {
		console.error('Question not found');
		return notFound();
	}
	if (question?.author.toString() !== session?.user?.id) {
		console.error('Unauthorized');
		return redirect(ROUTES.QUESTIONS(id));
	}
	return (
		<>
			<h1 className='h1-bold text-dark100_light900'>Edit a question</h1>
			<div className='mt-9'>
				<QuestionForm question={question} isEditable />
			</div>
		</>
	);
};

export default EditQuestion;
