'use client';

import React, { FC } from 'react';
import { Table, Anchor } from '@mantine/core';
import Link from 'next/link';
import { Projects } from '@/lib/supabase/types';

interface ProjectListTableProps {
	projects: Projects;
}

const ProjectListTable: FC<ProjectListTableProps> = async ({ projects }) => {
	const rows = projects.map((project) => (
		<Table.Tr key={project.id}>
			<Table.Td>{project.name}</Table.Td>
			<Table.Td>{project.description}</Table.Td>
			<Table.Td>{project.team_support_email}</Table.Td>
			<Table.Td>
				<Anchor
					href={`/dashboard/projects/${project.id}`}
					component={Link}>
					Inspect
				</Anchor>
			</Table.Td>
		</Table.Tr>
	));
	return (
		<main>
			<h1>Projects List</h1>
			<Table
				c='teal'
				horizontalSpacing='xl'
				verticalSpacing='sm'
				captionSide='bottom'
				striped={false}
				highlightOnHover={true}
				withTableBorder={true}
				withRowBorders={false}>
				<Table.Caption>Logs Projects List</Table.Caption>
				<Table.Thead>
					<Table.Tr>
						{Object.keys(projects[0])
							.filter((key) => key !== 'id')
							.filter((key) => key !== 'created_at')
							.filter((key) => key !== 'members')
							.map((projectKey) => {
								if (projectKey === 'team_support_email') {
									projectKey = 'Support Email';
								}
								return <Table.Th className='capitalize'>{projectKey}</Table.Th>;
							})}
						<Table.Th></Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</main>
	);
};

export default ProjectListTable;
