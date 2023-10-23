import React, { FC, useState, useEffect } from 'react';
import navbarStyles from '../../styles/navbar.module.css';
import { Group, Code } from '@mantine/core';
import {
	IconBellRinging,
	IconReceipt2,
	IconSettings,
	IconHome,
	IconLogout,
	IconDatabaseCog,
	Icon2fa,
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import UserAvatar from '../ui/UserAvatar';

interface SideNavProps {}

const SideNav: FC<SideNavProps> = ({}) => {
	const [active, setActive] = useState('Dashboard');
	const location = useLocation();

	const sideNavData = [
		{ link: '', label: 'Dashboard', icon: Icon2fa },
		{ link: '/notifications', label: 'Notifications', icon: IconBellRinging },
		{ link: '/projects', label: 'Projects', icon: IconDatabaseCog },
		{ link: '/billing', label: 'Billing', icon: IconReceipt2 },
		{ link: '/settings', label: 'Account Settings', icon: IconSettings },
		// { link: '', label: 'Security', icon: IconFingerprint },
		// { link: '', label: 'SSH Keys', icon: IconKey },
	];

	useEffect(() => {
		const currentPath = location.pathname;
		const currentNavItem = sideNavData.find(
			(item) => currentPath === `/dashboard${item.link}`
		);
		if (currentNavItem) {
			setActive(currentNavItem.label);
		}
	}, [location.pathname, sideNavData]);

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
		<>
			<div className={navbarStyles.navbarMain}>
				<Group
					className={navbarStyles.header}
					justify='space-between'>
					<UserAvatar />
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
		</>
	);
};

export default SideNav;
