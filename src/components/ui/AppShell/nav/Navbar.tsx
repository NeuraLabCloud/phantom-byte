'use client';

import React, { FC, useEffect, useState } from 'react';
import {
	Badge,
	Center,
	Code,
	Container,
	SegmentedControl,
	Text,
} from '@mantine/core';
import {
	IconBellRinging,
	IconReceipt2,
	IconDashboard,
	IconDatabaseCog,
	IconHome,
	IconMessage,
	IconTicket,
	IconBook,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import Link from 'next/link';
import { useIdle } from '@mantine/hooks';
import { UserButton } from '@clerk/clerk-react';

const tabs = {
	general: [
		{ link: '', label: 'Dashboard', icon: IconDashboard },
		{ link: '/notifications', label: 'Notifications', icon: IconBellRinging },
		{ link: '/projects', label: 'Projects', icon: IconDatabaseCog },
		{ link: '/billing', label: 'Billing', icon: IconReceipt2 },
	],
	support: [
		{ link: '/documentation', label: 'Documentation', icon: IconBook },
		{ link: '/support-ticket', label: 'Support Ticket', icon: IconTicket },
		{ link: '/contact', label: 'Contact', icon: IconMessage },
	],
};

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
	const [section, setSection] = useState<'general' | 'support'>('general');
	const [active, setActive] = useState('Dashboard');

	const idle = useIdle(5000);
	// const router = useRouter();
	// const pathName = usePathname();
	// const query = useSearchParams();

	const links = tabs[section].map((item) => (
		<Link
			className={classes.link}
			data-active={item.label === active || undefined}
			href={{ pathname: '/dashboard' + item.link }}
			key={item.label}
			onClick={() => {
				setActive(item.label);
			}}>
			<item.icon
				className={classes.linkIcon}
				stroke={1.5}
			/>
			<span>{item.label}</span>
		</Link>
	));

	// useEffect(() => {
	// 	const sectionFromQuery = query.get('section');
	// 	const activeFromQuery = query.get('active');

	// 	if (
	// 		sectionFromQuery &&
	// 		(sectionFromQuery === 'general' || sectionFromQuery === 'support')
	// 	) {
	// 		setSection(sectionFromQuery);
	// 	}
	// 	if (activeFromQuery) {
	// 		setActive(
	// 			activeFromQuery.charAt(0).toUpperCase() + activeFromQuery.slice(1)
	// 		);
	// 	}
	// }, [query]);

	// useEffect(() => {
	// 	if (!query.get('section')) {
	// 		router.push(`${pathName}?section=${section}&active=${active.toLowerCase()}`);
	// 	}
	// }, [section, pathName, active]);

	return (
		<nav>
			<div>
				<Text
					fw={500}
					size='sm'
					className={classes.title}
					c='dimmed'
					mb='xs'>
					<Container>
						<Center>
							<Badge color={idle ? 'yellow' : 'violet'}>
								{idle ? 'Idle' : 'Online'}
							</Badge>
						</Center>
						<Center className='mt-2'>
							<Code>alpha-unix-build-v0.2.4</Code>
						</Center>
					</Container>
				</Text>

				<SegmentedControl
					transitionDuration={350}
					value={section}
					//@ts-expect-error
					onChange={(value: 'account' | 'general') => {
						//@ts-expect-error
						setSection(value);
						// router.push(
						// 	`${pathName}?section=${section}?active=${active.toLocaleLowerCase()}`
						// );
					}}
					transitionTimingFunction='ease'
					fullWidth
					data={[
						{
							value: 'general',
							label: (
								<Center>
									<Text
										c='violet'
										opacity={section === 'general' ? 1 : 0.5}>
										General
									</Text>
								</Center>
							),
						},
						{
							value: 'support',
							label: (
								<Center>
									<Text
										c='red'
										opacity={section === 'support' ? 1 : 0.5}>
										Support
									</Text>
								</Center>
							),
						},
					]}
				/>
			</div>

			<div className={classes.navbarMain}>{links}</div>

			<Center className='mt-4'>
				<UserButton
					afterSignOutUrl='/'
				/>
			</Center>

			<div className={classes.footer}>
				<Link
					href='/'
					className={classes.link}>
					<IconHome
						className={classes.linkIcon}
						stroke={1.5}
					/>
					<span>Home</span>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
