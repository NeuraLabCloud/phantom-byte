import React, { FC } from 'react';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { AppShell } from '@mantine/core';

import Header from '../components/routes/Header';
import SideNav from '../components/routes/SideNav';
import MainContent from '../components/routes/MainContent';

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
	const [navOpened, { toggle: toggleNavOpen }] = useDisclosure();
	const pinned = useHeadroom({ fixedAt: 120 });

	return (
		<AppShell
			transitionDuration={500}
			transitionTimingFunction='ease'
			header={{ height: 60, collapsed: !pinned }}
			navbar={{ width: 235, breakpoint: 'sm', collapsed: { mobile: !navOpened } }}
			padding='md'>
			<AppShell.Header>
				<Header
					navOpened={navOpened}
					toggleNavOpen={toggleNavOpen}
				/>
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<SideNav />
			</AppShell.Navbar>

			<AppShell.Main>
				<MainContent />
			</AppShell.Main>
		</AppShell>
	);
};

export default DashboardPage;
