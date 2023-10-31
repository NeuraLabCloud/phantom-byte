'use client';

import { useQuery } from 'convex/react';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
	Box,
	Button,
	Card,
	TextInput,
	Title,
	Text,
	rem,
	Container,
} from '@mantine/core';
import { api } from '../../../../convex/_generated/api';
import LoadingState from '@/components/ui/LoadingState';
import FullCenter from '@/components/ui/FullCenter';
import { notifications } from '@mantine/notifications';
import { IconAt } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import Link from 'next/link';

type ProjectFormValues = {
	name: string;
	description?: string;
	support_email?: string;
};

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
	const [creatingProject, setCreatingProject] = useState(false);
	const [newProjectForm, setNewProjectForm] = useState<ProjectFormValues | null>(
		null
	);

	const projects = useQuery(api.projects.list);

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

	if (!projects) return <LoadingState />;

	const handleCreateProject = async (values: ProjectFormValues) => {
		setCreatingProject(true);

		const id = notifications.show({
			message: 'Creating project...',
			autoClose: false,
			withCloseButton: false,
			color: 'yellow',
			loading: true,
		});

		console.log(values);

		notifications.update({
			id,
			message: 'Project created!',
			color: 'green',
			loading: false,
			autoClose: 3000,
		});

		form.reset();
		setCreatingProject(false);
	};

	const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

	if (projects.length === 0)
		return (
			<>
				<FullCenter>
					<Container>
						<Title order={1}>Create your first project</Title>
						<form onSubmit={form.onSubmit((values) => handleCreateProject(values))}>
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
								href={'/'}
								className='ml-4'
								variant='default'
								loading={creatingProject}
								type='submit'>
								Back
							</Button>
						</form>
					</Container>
				</FullCenter>
			</>
		);

	return (
		<div className='flex items-center justify-center h-full'>
			<div className='grid grid-cols-3 gap-4'>
				{projects.map((project, index) => (
					<Card
						key={index}
						shadow='md'
						padding='md'>
						{project.name}
					</Card>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
