'use client';
import React from 'react';

import { AuthForm } from '@/components/forms/AuthForm';
import { FORM_TYPES } from '@/constant';
import { signUpWithCredentials } from '@/lib/actions/auth.action';
import { SignUpSchema } from '@/lib/validation';

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
			onSubmit={signUpWithCredentials}
		/>
	);
};

export default SignUp;
