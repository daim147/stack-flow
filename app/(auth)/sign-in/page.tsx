'use client';
import { AuthForm } from '@/components/forms/AuthForm';
import { FORM_TYPES } from '@/constant';
import { signInWithCredentials } from '@/lib/actions/auth.action';
import { SignInSchema } from '@/lib/validations';

const SignIn = () => {
	return (
		<AuthForm
			formType={FORM_TYPES.SIGN_IN}
			schema={SignInSchema}
			defaultValues={{
				email: '',
				password: '',
			}}
			onSubmit={signInWithCredentials}
		/>
	);
};

export default SignIn;
