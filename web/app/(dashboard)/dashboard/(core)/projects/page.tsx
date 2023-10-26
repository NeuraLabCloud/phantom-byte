import Cards from "@/components/ui/Cards";
import { trpc } from "@/lib/trpc/server/client";
import { getBaseUrl } from "@/lib/trpc/shared";
import React, { FC } from "react";

// needed to avoid https://nextjs.org/docs/messages/dynamic-server-error error on build
export const dynamic = "force-dynamic";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const projects = await trpc.projects.list.query();

  return (
    <>
      {projects.map((project, index) => (
        <div key={index}>
          <Cards
            title={project.name}
            description={project.description}
            link={`${getBaseUrl()}/dashboard/projects/${project.id}`}
            color="violet"
            btnText="View Project"
            underConstruction={false}
          />
        </div>
      ))}
    </>
  );
};

export default page;
