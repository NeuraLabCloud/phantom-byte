import React, { FC } from "react";
import DashboardAppShell from "@/components/ui/AppShell/DashboardAppShell";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  return (
    <>
      <DashboardAppShell>
        {children}
      </DashboardAppShell>
    </>
  );
};

export default DashboardLayout;
