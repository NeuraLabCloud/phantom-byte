'use client';

import React, { FC, useEffect, useState } from 'react';
import { Menu, Button, Text, rem, Skeleton } from '@mantine/core';
import {
	IconArrowDown,
	IconBook2,
	IconBrandDiscord,
	IconBrandGithub,
	IconPlus,
	IconSettings,
} from '@tabler/icons-react';
import Link from 'next/link';
import { AppHeaderData } from '@/types/clerk';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Doc } from '../../../../convex/_generated/dataModel';
import { redirect } from 'next/navigation';

interface HeaderProps {
	data: AppHeaderData | null;
}

// todo - fetch the project based on the url and not hard coded. This way we can load a project when the user logs on. If no projects, blank page.
// when a project is found, we load all its services and display them on the center of the page.
const ProjectHeader: FC<HeaderProps> = ({ data }) => {
	const [projectMenuClicked, setProjectMenuClicked] = useState(false);
	const [selectedProject, setSelectedProject] = useState<Doc<'projects'> | null>(
		null
	);

	const projects = useQuery(api.projects.list);

	// When the component mounts, we want to load the projects and services.
	// By default we get the first project the user has but they can change it if they want in the ui.
	useEffect(() => {
		if (projects) {
			setSelectedProject(projects[0]);
		}
	}, [projects]);

	if (!selectedProject || !projects) {
		return <Skeleton height={50} />;
	}

	return (
		<div className='flex items-center justify-between p-4 shadow-md bg-gray-600/20'>
			{/* Logo */}
			<div>{/* Add your logo here */}logo here</div>

			{/* Project Dropdown */}
			<div className='flex mr-4 items-center'>
				<Menu
					shadow='md'
					width={200}
					transitionProps={{ transition: 'pop', duration: 150 }}>
					<Menu.Target>
						<Button onClick={() => setProjectMenuClicked(!projectMenuClicked)}>
							{selectedProject.name}{' '}
							{projectMenuClicked ? (
								<IconArrowDown
									size={14}
									style={{ transform: 'rotate(180deg)' }}
								/>
							) : (
								<IconArrowDown size={14} />
							)}
						</Button>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>Project Selection</Menu.Label>

						{projects.map((project, index) => {
							return (
								<Menu.Item
									key={index}
									leftSection={
										<IconSettings style={{ width: rem(14), height: rem(14) }} />
									}>
									{project.name}
								</Menu.Item>
							);
						})}

						<Menu.Divider />

						<Menu.Label>
							<div className='flex items-center'>
								<Button
									className='mr-'
									variant='transparent'
									href={'/dashboard'}
									component={Link}>
									<IconPlus
										color='pink'
										className='mr-1'
									/>{' '}
									<Text
										size='sm'
										c='cyan'>
										Create new project
									</Text>
								</Button>
							</div>
						</Menu.Label>
					</Menu.Dropdown>
				</Menu>

				{/* Project Tab */}
				<div className='ml-4'>
					<Button variant='subtle'>Services</Button>
				</div>

				{/* Project Settings */}
				<div className='ml-4'>
					<Button variant='subtle'>
						Project Settings <IconSettings className='ml-2' />{' '}
					</Button>
				</div>
			</div>

			{/* Discord and Github Icons */}
			<div className='flex items-center'>
				<Link
					href={'/docs'}
					rel='noopener noreferrer'>
					<IconBook2
						size={24}
						className='mr-4'
					/>
				</Link>
				<a
					href='https://discord.com'
					target='_blank'
					rel='noopener noreferrer'
					className='mr-4'>
					<IconBrandDiscord size={24} />
				</a>
				<a
					href='https://github.com/PhantomByteCloud'
					target='_blank'
					rel='noopener noreferrer'>
					<IconBrandGithub size={24} />
				</a>
			</div>
		</div>
	);
};

export default ProjectHeader;
