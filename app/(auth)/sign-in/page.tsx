'use client';
import { AuthForm } from '@/components/forms/AuthForm';
import { FORM_TYPES } from '@/constant';
import { SignInSchema } from '@/lib/validation';

const SignIn = () => {
	return (
		<AuthForm
			formType={FORM_TYPES.SIGN_IN}
			schema={SignInSchema}
			defaultValues={{
				email: '',
				password: '',
			}}
			onSubmit={(data) => Promise.resolve({ success: true, data })}
		/>
	);
};

export default SignIn;
