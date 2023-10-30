import { AppShellBuilder } from "@/components/ui/AppShell";
import { AppShellUserData } from "@/types/clerk";
import { currentUser } from "@clerk/nextjs";
import React, { FC } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  const user = await currentUser();

  const data = {
    username: user?.username || user?.firstName || "Unknown User",
  } as AppShellUserData;

  return <AppShellBuilder userData={data}>{children}</AppShellBuilder>;
};

export default DashboardLayout;
