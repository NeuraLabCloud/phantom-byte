'use client';

import React, { FC } from 'react';
import { Menu, Group, Center, Container } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './Header.module.css';
import Link from 'next/link';

const links = [
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

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
	const items = links.map((link) => {
		const menuItems = link.links?.map((item) => (
			<Menu.Item key={item.link}>{item.label}</Menu.Item>
		));

		if (menuItems) {
			return (
				<Menu
					key={link.label}
					trigger='hover'
					transitionProps={{ exitDuration: 0 }}
					withinPortal>
					<Menu.Target>
						<Link
							href={link.link}
							className={classes.link}
							onClick={(event) => event.preventDefault()}>
							<Center>
								<span className={classes.linkLabel}>{link.label}</span>
								<IconChevronDown
									size='0.9rem'
									stroke={1.5}
								/>
							</Center>
						</Link>
					</Menu.Target>
					<Menu.Dropdown>{menuItems}</Menu.Dropdown>
				</Menu>
			);
		}

		return (
			<Link
				key={link.label}
				href={link.link}
				className={classes.link}
				onClick={(event) => event.preventDefault()}>
				{link.label}
			</Link>
		);
	});

	return (
		<header>
			<Container
				size='md'
				className='mt-2'>
				<div className={classes.inner}>
					put a logo here
					<Group
						gap={5}
						visibleFrom='sm'>
						{items}
					</Group>
				</div>
			</Container>
		</header>
	);
};

export default Header;
