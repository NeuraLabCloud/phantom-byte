'use client';

import { useMutation, useQuery } from 'convex/react';
import React, { FC, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { ProjectLimitations } from '@/types/enums';
import {
	Box,
	Button,
	Center,
	Text,
	TextInput,
	Title,
	rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import Cards from '../ui/Cards';
import { IconAt } from '@tabler/icons-react';

type ProjectForm = {
	name: string;
	description: string;
	support_email: string;
};

interface ProjectPageProps {
	user_id: string;
}

const ProjectPage: FC<ProjectPageProps> = ({ user_id }) => {
	const [creatingProject, setCreatingProject] = useState(false);
	const [newProjectForm, setNewProjectForm] = useState<ProjectForm | null>(null);

	const projectList = useQuery(api.projects.list, { user_id });
	const createProject = useMutation(api.projects.create);

	// We do this because the query is still loading
	if (!projectList) return null;

	const handleCreateProject = async () => {
		setCreatingProject(true);

		const id = notifications.show({
			message: 'Creating project...',
			autoClose: false,
			withCloseButton: false,
			color: 'yellow',
			loading: true,
		});

        console.log(newProjectForm);

		if (newProjectForm) {
			await createProject({
				name: newProjectForm.name,
				description: newProjectForm.description,
				support_email: newProjectForm.support_email,
				user_id,
			});

			notifications.update({
				id,
				message: 'Project created!',
				color: 'violet',
				loading: false,
				autoClose: 3000,
				withCloseButton: true,
			});
		} else {
			notifications.update({
				id,
				message: 'Invalid project form!',
				autoClose: 3000,
				withCloseButton: true,
				loading: false,
			});
		}

		setCreatingProject(false);
	};

	const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
	const openModal = () =>
		modals.openConfirmModal({
			title: <Title>Create A Project</Title>,
			children: (
				<Box
					maw={340}
					mx='auto'>
					<TextInput
						label='Name'
						placeholder='Your project name'
						value={newProjectForm?.name}
						onChange={(event) =>
							setNewProjectForm({
								...newProjectForm!,
								name: event.currentTarget.value,
							})
						}
					/>
					<TextInput
						label='Description'
						placeholder='optional'
						value={newProjectForm?.description}
						onChange={(event) =>
							setNewProjectForm({
								...newProjectForm!,
								description: event.currentTarget.value,
							})
						}
					/>
					<TextInput
						label='Project Support Email'
						placeholder='optional'
						value={newProjectForm?.support_email}
						onChange={(event) =>
							setNewProjectForm({
								...newProjectForm!,
								support_email: event.currentTarget.value,
							})
						}
						rightSection={icon}
					/>
				</Box>
			),
			onCancel: () => {
				notifications.show({
					message: 'Project creation cancelled!',
					color: 'yellow',
					autoClose: 3000,
				});
			},
			onConfirm: () => handleCreateProject(),
		});

	return (
		<>
			{projectList.length ? (
				projectList.map((project) => (
					<Cards
						key={project._id}
						title={project.name}
						description={project.description || 'No description provided.'}
						link={{ pathname: `/dashboard/projects/${project._id}` }}
						btnText='View Project'
					/>
				))
			) : (
				<Center>
					<Text className='mb-10'>No current projects.</Text>
				</Center>
			)}
			{projectList?.length < ProjectLimitations.MAX_PROJECTS && (
				<Center>
					<Button
						variant='outline'
						onClick={openModal}
						disabled={creatingProject}>
						<Text>Create Project</Text>
					</Button>
				</Center>
			)}
		</>
	);
};

export default ProjectPage;
