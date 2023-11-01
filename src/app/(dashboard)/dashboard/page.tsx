'use client';

import { useMutation, useQuery } from 'convex/react';
import React, { FC, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import {
	Button,
	TextInput,
	Title,
	rem,
	Container,
	Grid,
	Paper,
	Text,
} from '@mantine/core';
import { api } from '../../../../convex/_generated/api';
import LoadingState from '@/components/ui/LoadingState';
import FullCenter from '@/components/ui/FullCenter';
import { notifications } from '@mantine/notifications';
import { IconAt, IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import {
	IConvexError,
	buildTypedErrorMessage,
} from '../../../../convex/_shared';
import Cards from '@/components/ui/Cards';
import { ProjectLimitations } from '@/types/enums';

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
	const [showProjects, setShowProjects] = useState(false);
	const projectsRef = useRef(null);

	const projects = useQuery(api.projects.list);
	const createProject = useMutation(api.projects.create);
	const deleteProject = useMutation(api.projects.deleteProject);

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

		try {
			await createProject(values).then(() => {
				notifications.update({
					id,
					message: 'Your project has been created successfully',
					color: 'green',
					loading: false,
					autoClose: 3000,
					withCloseButton: true,
				});
			});
		} catch (error) {
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
		}

		form.reset();
		setCreatingProject(false);
	};

	const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

	if (projects.length === 0) {
		return createProjectForm(true, form, handleCreateProject, creatingProject);
	}

	return (
		<div className='min-h-screen p-6'>
			<div className='flex justify-center fixed top-4 inset-x-0'>
				<button
					onClick={() => {
						setShowProjects(true);
						//@ts-ignore
						projectsRef.current.scrollIntoView({ behavior: 'smooth' });
					}}
					className={`bg-violet-600 animate-blink text-white py-2 px-4 rounded ${
						showProjects ? 'hidden' : 'block'
					}`}>
					View Current Projects
				</button>
			</div>

			{projects.length < ProjectLimitations.MAX_PROJECTS && (
				<div className='mb-8'>
					{createProjectForm(false, form, handleCreateProject, creatingProject)}
				</div>
			)}

			<div
				ref={projectsRef}
				className='mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{projects.map((project, index) => (
					<div
						key={index}
						className='mb-4'>
						<Cards
							title={project.name}
							description={project.description || 'No description provided'}
							link={{ pathname: `/dashboard/p/${project._id}` }}
							btnText='View Project'
						/>
						<div className='mt-2 flex justify-center'>
							<button
								onClick={async () => deleteProject({ project_id: project._id })}
								className='w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded'>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);

};

export default Dashboard;

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
	);
}
