import React, { FC } from 'react';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { AppShell } from '@mantine/core';

import Header from '../components/routes/Header';
import SideNav from '../components/routes/SideNav';
import { useAuth } from '../hooks/useAuth';

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
	const [navOpened, { toggle: toggleNavOpen }] = useDisclosure();
	const pinned = useHeadroom({ fixedAt: 120 });

	const auth = useAuth();

	console.log(auth);

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

			<AppShell.Main>Hello {auth?.user?.email}</AppShell.Main>
		</AppShell>
	);
};

export default DashboardPage;
