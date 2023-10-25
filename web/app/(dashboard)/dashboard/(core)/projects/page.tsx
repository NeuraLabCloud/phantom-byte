"use client"

import React, { FC } from 'react'
import { Table, NavLink, Anchor } from '@mantine/core'
import { IconHome2 } from '@tabler/icons-react';
import Link from 'next/link';
import {trpc} from "@/lib/trpc/client";
interface pageProps { }

const page: FC<pageProps> = async ({ }) => {
    const logProjects = trpc.getClientProjects.useQuery()

    return (
        <div>
            {
                JSON.stringify(logProjects.data, null, 2)
            }
        </div>
    )

    // const rows = logProjects.data?.map((project) => (
    //     <Table.Tr key={project.title}>
    //         <Table.Td>{project.title}</Table.Td>
    //         {/* <Table.Td>{project.description}</Table.Td> */}
    //         {/* <Table.Td>{project.technologies}</Table.Td>
    //         <Table.Td>{project.teamMembers}</Table.Td> */}
    //         <Table.Td>{project.duration}</Table.Td>
    //         <Table.Td>
    //             <Anchor href={`/dashboard/projects/${project.id}`} component={Link}>
    //                 Inspect
    //             </Anchor>
    //         </Table.Td>
    //     </Table.Tr>
    // ));
    // return (
    //     <main>
    //         <h1>Projects List</h1>
    //         <Table
    //             horizontalSpacing="xl"
    //             verticalSpacing="sm"
    //             captionSide="bottom"
    //             striped
    //             highlightOnHover
    //             withRowBorders={false}
    //         >
    //             <Table.Caption>Logs Projects List</Table.Caption>
    //             <Table.Thead>
    //                 <Table.Tr>
    //                     {Object.keys(logProjects.data![0]).filter((key)=>key !== 'id').map((projectKey) => {
    //                         return <Table.Th className='capitalize'>{projectKey}</Table.Th>
    //                     })}
    //                     <Table.Th></Table.Th>
    //                 </Table.Tr>
    //             </Table.Thead>
    //             <Table.Tbody>{rows}</Table.Tbody>
    //         </Table>
    //     </main>
    // )
}

export default page