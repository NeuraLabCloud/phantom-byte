'use client';

import React, { FC } from 'react';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { AppShell, Burger, Center, Group, Text } from '@mantine/core';
import Navbar from './nav/Navbar';

interface indexProps {
	children: React.ReactNode;
}

export const AppShellBuilder: FC<indexProps> = async ({ children }) => {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{
				height: { base: 20, md: 30, lg: 50 },
				offset: true,
			}}
			navbar={{
				width: { base: 200, md: 225, lg: 275 },
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
			padding='md'>
			<AppShell.Header>
				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom='sm'
					size='sm'
				/>
				{/* <Center>
					<Text>PhantomByte Dashboard</Text>
				</Center> */}
			</AppShell.Header>
			<AppShell.Navbar p='md'>
				<Navbar />
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
};
