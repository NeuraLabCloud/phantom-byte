'use client';

import React, { FC } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import ScreenCenter from '@/components/ui/ScreenCenter';
import { Button, Center, Container, Text } from '@mantine/core';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase';

interface ComponentProps {}

const Component: FC<ComponentProps> = ({}) => {
	return (
		<ScreenCenter>
			<Container>
				<Auth
					supabaseClient={supabaseClient}
					appearance={{ theme: ThemeSupa }}
					theme='dark'
					onlyThirdPartyProviders={true}
					providers={['github', 'google']}
					redirectTo={`${window.location.origin}/auth/v1/callback`}
				/>
				<Center>
					<Button
						variant='outline'
						size='xs'
						component={Link}
						href={'/'}>
						<Text className='text-zinc-300'>Home</Text>
					</Button>
				</Center>
			</Container>
		</ScreenCenter>
	);
};

export default Component;
