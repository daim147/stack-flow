'use client';
import { AuthForm } from '@/components/forms/AuthForm';
import { FORM_TYPES } from '@/constant';
import { SignUpSchema } from '@/lib/validation';
import React from 'react';

const SignUp = () => {
	return (
		<AuthForm
			formType={FORM_TYPES.SIGN_UP}
			schema={SignUpSchema}
			defaultValues={{
				email: '',
				password: '',
				username: '',
				name: '',
			}}
			onSubmit={(data) => Promise.resolve({ success: true, data })}
		/>
	);
};

export default SignUp;
