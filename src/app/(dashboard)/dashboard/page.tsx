'use client';

import { useMutation, useQuery } from 'convex/react';
import React, { FC } from 'react';
import { api } from '../../../../convex/_generated/api';
import LoadingState from '@/components/ui/LoadingState';
import Cards from '@/components/ui/Cards';
import { ProjectLimitations } from '@/types/enums';
import { Button, Center, Container, Text, Title } from '@mantine/core';
import FullCenter from '@/components/ui/FullCenter';
import Link from 'next/link';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
	const projects = useQuery(api.projects.list);
	const deleteProject = useMutation(api.projects.deleteProject);

	if (!projects) return <LoadingState />;

	const hitMaxProjects = projects.length === ProjectLimitations.MAX_PROJECTS;

	if (projects.length === 0) {
		return (
			<>
				<FullCenter>
					<Container>
						<Title>No Projects Found!</Title>
						<Button
							href={'/dashboard/p/create'}
							component={Link}
							className='mt-4 w-full'
							variant='outline'>
							<Text>Click to get started!</Text>
						</Button>
					</Container>
				</FullCenter>
			</>
		);
	}

	return (
		<div className='min-h-screen p-6'>
			{projects.length <= ProjectLimitations.MAX_PROJECTS && (
				<div className='mb-8'>
					<Center>
						<Container>
							<Center>
								<Title>Project Dashboard</Title>
							</Center>
							<Text className='mt-4 mb-2'>
								You have {ProjectLimitations.MAX_PROJECTS - projects.length} project
								slots left on your account.
							</Text>
							<Center>
								{hitMaxProjects ? (
									<Button
										disabled={hitMaxProjects}
										className='mt-4'
										variant='outline'>
										<Text>Create Project</Text>
									</Button>
								) : (
									<Button
										href={'/dashboard/p/create'}
										component={Link}
										className='mt-4'
										variant='outline'>
										<Text>Create Project</Text>
									</Button>
								)}
							</Center>
						</Container>
					</Center>
				</div>
			)}

			<div className='mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
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
