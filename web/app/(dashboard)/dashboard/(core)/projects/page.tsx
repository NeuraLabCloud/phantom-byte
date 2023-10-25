import ProjectListTable from '@/components/page-ui/ProjectListTable'
import { trpc } from '@/lib/trpc/server/client'
import React, { FC } from 'react'

// needed to avoid https://nextjs.org/docs/messages/dynamic-server-error error on build
export const dynamic = 'force-dynamic';

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
   const projects = await trpc.getClientProjects.query()
   
   return <ProjectListTable projects={projects} />;
}

export default page