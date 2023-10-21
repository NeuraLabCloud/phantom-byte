import headerStyles from '../styles/header.module.css';
import navbarStyles from '../styles/navbar.module.css';

import React, { FC, useState } from 'react';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import {
	AppShell,
	Burger,
	Button,
	Center,
	Code,
	Container,
	Group,
	Menu,
} from '@mantine/core';
import {
	IconBellRinging,
	IconFingerprint,
	IconKey,
	IconSettings,
	Icon2fa,
	IconDatabaseImport,
	IconReceipt2,
	IconLogout,
	IconHome,
} from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';
import AppAvatar from '../components/ui/AppAvatar';
import { Link } from 'react-router-dom';
import useSession from '../hooks/useSession';

interface DashboardPageProps {}

const headerLinks = [
	{ link: '/about', label: 'Features' },
	{
		link: '#1',
		label: 'Learn',
		links: [
			{ link: '/docs', label: 'Documentation' },
			{ link: '/resources', label: 'Resources' },
			{ link: '/community', label: 'Community' },
			{ link: '/blog', label: 'Blog' },
		],
	},
	{ link: '/about', label: 'About' },
	{ link: '/pricing', label: 'Pricing' },
	{
		link: '#2',
		label: 'Support',
		links: [
			{ link: '/faq', label: 'FAQ' },
			{ link: '/demo', label: 'Book a demo' },
			{ link: '/forums', label: 'Forums' },
		],
	},
];

const sideNavData = [
	{ link: '', label: 'Notifications', icon: IconBellRinging },
	{ link: '', label: 'Billing', icon: IconReceipt2 },
	{ link: '', label: 'Security', icon: IconFingerprint },
	{ link: '', label: 'SSH Keys', icon: IconKey },
	{ link: '', label: 'Databases', icon: IconDatabaseImport },
	{ link: '', label: 'Authentication', icon: Icon2fa },
	{ link: '', label: 'Other Settings', icon: IconSettings },
];

const DashboardPage: FC<DashboardPageProps> = ({}) => {
	const [navOpened, { toggle: toggleNavOpen }] = useDisclosure();
	const pinned = useHeadroom({ fixedAt: 120 });
	const [active, setActive] = useState('Billing');
	const { session } = useSession();

	const items = headerLinks.map((mappedLinks) => {
		const menuItems = mappedLinks.links?.map((item) => (
			<Menu.Item key={item.link}>
				<Link to={item.link}>{item.label}</Link>
			</Menu.Item>
		));

		if (menuItems) {
			return (
				<Menu
					key={mappedLinks.label}
					trigger='hover'
					transitionProps={{ exitDuration: 0 }}
					withinPortal>
					<Menu.Target>
						<Button
							variant="default"
							component={Link}
							to={mappedLinks.link}
							className={headerStyles.link}>
							<Center>
								<span className={headerStyles.linkLabel}>{mappedLinks.label}</span>
								<IconChevronDown
									size='0.9rem'
									stroke={1.5}
								/>
							</Center>
						</Button>
					</Menu.Target>
					<Menu.Dropdown>{menuItems}</Menu.Dropdown>
				</Menu>
			);
		}

		return (
			<Link
				key={mappedLinks.label}
				to={mappedLinks.link}
				className={headerStyles.link}>
				{mappedLinks.label}
			</Link>
		);
	});

	const links = sideNavData.map((item) => (
		<Link
			className={navbarStyles.link}
			data-active={item.label === active || undefined}
			to={`/dashboard${item.link}`}
			key={item.label}
			onClick={() => {
				setActive(item.label);
			}}>
			<item.icon
				className={navbarStyles.linkIcon}
				stroke={1.5}
			/>
			<span>{item.label}</span>
		</Link>
	));

	return (
		<AppShell
			transitionDuration={500}
			transitionTimingFunction='ease'
			header={{ height: 60, collapsed: !pinned }}
			navbar={{ width: 235, breakpoint: 'sm', collapsed: { mobile: !navOpened } }}
			padding='md'>
			<AppShell.Header>
				<Burger
					opened={navOpened}
					onClick={toggleNavOpen}
					hiddenFrom='sm'
					size='sm'
				/>
				<Container size='md'>
					<Center>
						<div className={headerStyles.inner}>
							<Group
								gap={5}
								visibleFrom='sm'>
								{items}
							</Group>
						</div>
					</Center>
				</Container>
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<div className={navbarStyles.navbarMain}>
					<Group
						className={navbarStyles.header}
						justify='space-between'>
						<AppAvatar />
						<Code fw={700}>v0.1.1</Code>
					</Group>
					{links}
				</div>

				<div className={navbarStyles.footer}>
					<Link
						to='/'
						className={navbarStyles.link}>
						<IconHome
							className={navbarStyles.linkIcon}
							stroke={1.5}
						/>
						<span>Home</span>
					</Link>
					<Link
						to='/logout'
						className={navbarStyles.link}>
						<IconLogout
							className={navbarStyles.linkIcon}
							stroke={1.5}
						/>
						<span>Logout</span>
					</Link>
				</div>
			</AppShell.Navbar>

			<AppShell.Main>Hello {session?.user.email}</AppShell.Main>
		</AppShell>
	);
};

export default DashboardPage;
