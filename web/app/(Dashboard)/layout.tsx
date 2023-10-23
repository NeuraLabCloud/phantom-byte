import React, { FC } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  return (
    <>
      hello world
      {children}
    </>
  );
};

export default DashboardLayout;
