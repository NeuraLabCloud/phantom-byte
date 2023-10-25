"use client"

import React, { FC } from 'react'
import { Table } from '@mantine/core'

const projectLogs = [
	{
		id: 1,
		project_id: 101,
		service_id: 201,
		created_at: '2023-10-25T08:30:00.000Z',
		data: { key1: 'value1', key2: 'value2' },
		message: 'This is an informational message',
		severity: 'Info'
	},
	{
		id: 2,
		project_id: 102,
		service_id: 202,
		created_at: '2023-10-25T09:15:00.000Z',
		data: { key3: 'value3', key4: 'value4' },
		message: 'Warning: Something unexpected happened',
		severity: 'Warn'
	},
	{
		id: 3,
		project_id: 103,
		service_id: 203,
		created_at: '2023-10-25T10:05:00.000Z',
		data: { key5: 'value5', key6: 'value6' },
		message: 'Debug message for debugging purposes',
		severity: 'Debug'
	},
	{
		id: 4,
		project_id: 104,
		service_id: 204,
		created_at: '2023-10-25T11:20:00.000Z',
		data: { key7: 'value7', key8: 'value8' },
		message: 'Error: An error occurred in the application',
		severity: 'Error'
	},
	{
		id: 5,
		project_id: 105,
		service_id: 205,
		created_at: '2023-10-25T12:45:00.000Z',
		data: { key9: 'value9', key10: 'value10' },
		message: 'Tracing message for performance analysis',
		severity: 'Trace'
	}
];

const columns = ['id', 'severity', 'created_at', 'message'];

interface pageProps { params: { id: string } }
const page: FC<pageProps> = async ({ params }) => {

	const rows = projectLogs.map((logItem) => (
		<Table.Tr key={logItem.id}>
			{columns.map((columnKey: string) => {
				//@ts-ignore
				return <Table.Td>{logItem[columnKey]}</Table.Td>
			})}
		</Table.Tr>
	));

	return (
		<main>
			<h1 className='pb-5'>Project: {params.id}</h1>
			<Table
				horizontalSpacing="xl"
				verticalSpacing="sm"
				captionSide="bottom"
				striped
				highlightOnHover
				withRowBorders={false}
			>
				<Table.Caption>Project's Logs List</Table.Caption>
				<Table.Thead>
					<Table.Tr>
						{columns.map((columnKey) => {
							return <Table.Th className='capitalize'>{columnKey}</Table.Th>
						})}
						<Table.Th></Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</main>
	)
}

export default page