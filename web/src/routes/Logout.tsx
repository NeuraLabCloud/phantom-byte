import React, { FC, useEffect } from 'react';
import { Button, Text } from '@mantine/core';
import ScreenCenter from '../components/ui/ScreenCenter';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useClientAuthStore } from '../lib/stores/client';

interface LogoutProps {}

const Logout: FC<LogoutProps> = ({}) => {
	const [logoutTriggered, setLogoutTriggered] = React.useState(false);
  const clientAuthStore = useClientAuthStore();

	const handleLogout = () => {
    supabase.auth.signOut({
      scope: 'local',
		});
    setLogoutTriggered(true);
	};

	useEffect(() => {
    if (logoutTriggered) {
      clientAuthStore.setAuthenticated('unauthenticated');
    }
	}, [logoutTriggered]);

	return (
		<>
			<ScreenCenter>
				<Button
					className='mr-2 animate-pulse'
					variant='default'
					component={Link}
					to={'/'}>
					<Text className='text-white'>Home</Text>
				</Button>
				<Button
					variant='outline'
					component={Link}
					to={'/'}
					onClick={handleLogout}>
					<Text className='text-white'>Logout</Text>
				</Button>
			</ScreenCenter>
		</>
	);
};

export default Logout;
