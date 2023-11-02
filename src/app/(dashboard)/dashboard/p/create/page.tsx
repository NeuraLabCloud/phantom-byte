'use client';

import React, { FC, useState } from 'react';
import { Button, TextInput, Title, rem, Container } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import FullCenter from '@/components/ui/FullCenter';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useMutation } from 'convex/react';
import { api } from '../../../../../../convex/_generated/api';
import { buildTypedErrorMessage } from '../../../../../../convex/_shared';
import { redirect } from 'next/navigation';

type ProjectFormValues = {
	name: string;
	description?: string;
	support_email?: string;
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const [creatingProject, setCreatingProject] = useState(false);
	const createProject = useMutation(api.projects.create);

	const form = useForm({
		initialValues: {
			name: '',
			description: '',
			support_email: '',
		},

		validate: {
			support_email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const handleCreateProject = async (values: ProjectFormValues) => {
		setCreatingProject(true);

		const id = notifications.show({
			message: 'Creating project...',
			autoClose: false,
			withCloseButton: false,
			color: 'yellow',
			loading: true,
		});

		await createProject(values)
			.then(() => {
				notifications.update({
					id,
					message: 'Your project has been created successfully',
					color: 'green',
					loading: false,
					autoClose: 3000,
					withCloseButton: true,
				});
			})
			.catch((error) => {
				const errorMessage = buildTypedErrorMessage(error);
				notifications.update({
					id,
					title: 'Error',
					message: errorMessage,
					color: 'red',
					loading: false,
					autoClose: 5000,
					withCloseButton: true,
				});
			});

		form.reset();
		setCreatingProject(false);
	};

	return (
		<>{createProjectForm(false, form, handleCreateProject, creatingProject)}</>
	);
};

export default page;

function createProjectForm(
	firstProject: boolean,
	form: any,
	handleCreateProject: any,
	creatingProject: boolean
) {
	const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
	return (
		<FullCenter>
			<Container>
				<Title order={1}>
					{firstProject ? 'Create your first project' : 'Create a new project'}
				</Title>
				<form
					onSubmit={form.onSubmit((values: any) => handleCreateProject(values))}>
					<TextInput
						required
						label='Project Name'
						placeholder='Space Invaders'
						{...form.getInputProps('name')}
					/>
					<TextInput
						label='Project Description'
						placeholder='Battling Space Invaders since 1978'
						{...form.getInputProps('description')}
					/>
					<TextInput
						required
						label='Project Support Email'
						placeholder='spaceinvadersteam@gmail.com'
						{...form.getInputProps('support_email')}
						rightSection={icon}
					/>
					<Button
						className='mt-4'
						variant='outline'
						loading={creatingProject}
						type='submit'>
						Create Project
					</Button>
					<Button
						component={Link}
						href={'/dashboard'}
						className='ml-4'
						variant='default'
						loading={creatingProject}
						type='submit'>
						Back
					</Button>
				</form>
			</Container>
		</FullCenter>
	);
}
