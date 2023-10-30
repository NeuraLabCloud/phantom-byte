import ProjectPage from "@/components/pages/ProjectPage";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await currentUser();

  if (!user) redirect("/");

  return <ProjectPage user_id={user?.id} />;
};

export default page;
