import { AppShellBuilder } from "@/components/ui/AppShell";
import React, { FC } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  return (
			<>
				<AppShellBuilder>{children}</AppShellBuilder>
			</>
		);
};

export default DashboardLayout;
