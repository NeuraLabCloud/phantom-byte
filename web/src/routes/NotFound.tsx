import { Button, Center, Container, Title } from '@mantine/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface NotFoundPageProps {}

const NotFoundPage: FC<NotFoundPageProps> = ({}) => {
	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<Container>
				<Center>
					<Title>404 - Page Not Found :(</Title>
				</Center>
				<Button
					className='mt-4 w-full'
					component={Link}
					to={'/'}>
					Click here to go back home
				</Button>
			</Container>
		</div>
	);
};

export default NotFoundPage;
