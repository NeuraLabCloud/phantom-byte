'use client';

import { useQuery } from 'convex/react';
import React, { FC, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { ProjectLimitations } from '@/types/enums';
import { Button, Center, Container, Text, Title } from '@mantine/core';
import FullCenter from '../ui/FullCenter';
import { notifications } from '@mantine/notifications';

interface ProjectPageProps {
    user_id: string;
}

const ProjectPage: FC<ProjectPageProps> = ({ user_id }) => {
	const [creatingProject, setCreatingProject] = useState(false);
    const projectList = useQuery(api.projects.list, { user_id });

	// We do this because the query is still loading
	if (!projectList) return null;

	if (projectList?.length === ProjectLimitations.MAX_PROJECTS) {
		return (
			<div>
				<FullCenter>
					<Container>
						<Center>
							<Title c='red'>Project Limit Reached</Title>
						</Center>
						<Text>
							You have reached the maximum number of projects. Please upgrade your plan
							to add more projects or delete some projects.
						</Text>
					</Container>
				</FullCenter>
			</div>
		);
	}

    const handleCreateProject = async () => {
        setCreatingProject(true);
        const id = notifications.show({
            message: 'Creating project...',
            autoClose: false,
            withCloseButton: false,
            color: "yellow",
            loading: true,
        })

        setCreatingProject(false);
    }

	if (projectList?.length === 0) {
		return (
			<>
				<Center>
					<Button
						variant='outline'
						onClick={handleCreateProject}
                        disabled={creatingProject}
                        >
						<Text>Create Project</Text>
					</Button>
				</Center>
			</>
		);
	}

	return (
		<>
			<div>{JSON.stringify(projectList, null, 2)}</div>
		</>
	);
};

export default ProjectPage;