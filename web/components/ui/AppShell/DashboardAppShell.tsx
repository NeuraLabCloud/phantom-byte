"use client"

import React, { FC } from "react";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import Header from "@/components/ui/AppShell/Header";
import SideNav from "@/components/ui/AppShell/SideNav";
interface DashboardAppShellProps {
    children: React.ReactNode;
}

const DashboardAppShell: FC<DashboardAppShellProps> = ({ children }) => {
  const [navOpened, { toggle: toggleNavOpen }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
        transitionDuration={500}
        transitionTimingFunction="ease"
        header={{ height: 60, collapsed: !pinned }}
        navbar={{
          width: 235,
          breakpoint: "sm",
          collapsed: { mobile: !navOpened },
        }}
        padding="md"
    >
        <AppShell.Header>
            <Header navOpened={navOpened} toggleNavOpen={toggleNavOpen} />
        </AppShell.Header>

        <AppShell.Navbar p="md">
            <SideNav />
        </AppShell.Navbar>

        <AppShell.Main>
            {children}
        </AppShell.Main>

    </AppShell>
  );
};

export default DashboardAppShell;
