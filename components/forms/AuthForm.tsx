'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

import { Button } from '../ui/button';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	Form,
} from '../ui/form';
import { Input } from '../ui/input';
import { FORM_TYPES } from '@/constant';
import Link from 'next/link';
import ROUTES from '@/constant/routes';

interface AuthFormProps<T extends FieldValues> {
	schema: ZodType<T>;
	defaultValues: T;
	onSubmit: (data: T) => Promise<{ success: boolean }>;
	formType: FORM_TYPES;
}

export function AuthForm<T extends FieldValues>({
	schema,
	defaultValues,
	onSubmit,
	formType,
}: AuthFormProps<T>) {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues as DefaultValues<T>,
	});

	const handleSubmit: SubmitHandler<T> = async () => {};

	const buttonText = formType === FORM_TYPES.SIGN_IN ? 'Sign in' : 'Sign up';

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='mt-10 space-y-6'>
				{Object.keys(defaultValues).map((fieldName) => {
					return (
						<FormField
							key={fieldName}
							control={form.control}
							name={fieldName as Path<T>}
							render={({ field }) => (
								<FormItem className='flex flex-col gap-2.5 w-full'>
									<FormLabel className='paragraph-medium text-dark400_light700'>
										{field.name === 'email'
											? 'Email Address'
											: field.name.charAt(0).toUpperCase() + field.name.slice(1)}
									</FormLabel>
									<FormControl>
										<Input
											required
											type={field.name === 'password' ? 'password' : 'text'}
											{...field}
											className='paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					);
				})}
				<Button
					disabled={form.formState.isSubmitting}
					className='primary-gradient paragraph-medium min-h-12 w-full rounded-2 py-3 font-inter px-4 !text-light-900'
				>
					{form.formState.isSubmitting
						? formType === FORM_TYPES.SIGN_IN
							? 'Signing in'
							: 'Signing up'
						: buttonText}
				</Button>
				{formType === FORM_TYPES.SIGN_IN ? (
					<p>
						Don't have an account?{' '}
						<Link className='paragraph-semibold primary-text-gradient' href={ROUTES.SIGN_UP}>
							Sign up
						</Link>{' '}
					</p>
				) : (
					<p>
						Already have an account?{' '}
						<Link className='paragraph-semibold primary-text-gradient' href={ROUTES.SIGN_IN}>
							Sign in
						</Link>{' '}
					</p>
				)}
			</form>
		</Form>
	);
}
