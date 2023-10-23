import {
	Box,
	Button,
	Center,
	Group,
	SimpleGrid,
	Tabs,
	TextInput,
	Title,
} from '@mantine/core';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import LoadSpinner from '../../components/ui/animations/loading/LoadSpinner';
import useMetadata from '../../hooks/useMetadata';
import { notifications } from '@mantine/notifications';
import { updateClientUsername } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useClientStore } from '../../lib/stores/client';

type CurrentSettings = {
	username: string;
} | null;

interface SettingsProps {}

const Settings: FC<SettingsProps> = ({}) => {
	const [loading, setLoading] = useState(true);
	const [currentSettings, setCurrentSettings] = useState<CurrentSettings>(null);
	const metadata = useMetadata();
	const clientStore = useClientStore();
	const auth = useAuth();

	const form = useForm({
		initialValues: {
			username: '',
		},
		validate: {
			username: (value) => {
				if (value.length < 5) {
					return 'Username must be at least 5 characters long';
				}
				if (value.length > 25) {
					return 'Username must be less than 35 characters long';
				}
			},
		},
	});

	const handleSubmit = (values: { username: string }) => {
		// Todo - update user settings
		console.log(values);

		console.log('user_id', auth?.user?.id);

		updateClientUsername(auth?.user?.id!, values.username).then((res) => {
			if (res.result === 'error') {
				notifications.show({
					title: 'Error',
					message: `There was an error updating your settings. Please try again.`,
					color: 'red',
					autoClose: 5000,
				});
			} else {
				notifications.show({
					title: 'Settings Updated',
					message: `Your settings have been updated successfully.`,
					color: 'green',
					autoClose: 3000,
				});
				form.reset();
				if(res.client) {
					clientStore.setClient(res.client);
				}
			}
		});
	};

	useEffect(() => {
		const settings = {
			username: metadata.username,
		};

		setCurrentSettings(settings);
		setLoading(false);
	}, [metadata.username]);

	return (
		<>
			<Center>
				<Title className='mt-10'>Account Settings</Title>
			</Center>
			{(!loading && currentSettings && (
				<Center className='mt-10'>
					<SimpleGrid cols={1}>
						<Tabs
							color='teal'
							defaultValue='first'>
							<Tabs.List>
								<Tabs.Tab
									value='first'
									color='blue'>
									Current
								</Tabs.Tab>
								<Tabs.Tab
									value='second'
									color='yellow'>
									Update
								</Tabs.Tab>
							</Tabs.List>

							<Tabs.Panel
								value='first'
								pt='xs'>
								Username:{' '}
								<span className={'text-violet-400'}>{currentSettings.username}</span>
							</Tabs.Panel>

							<Tabs.Panel
								value='second'
								pt='xs'>
								<Box
									maw={340}
									mx='auto'>
									<form onSubmit={form.onSubmit(handleSubmit)}>
										<TextInput
											withAsterisk
											label='Update Username'
											placeholder='Enter your username'
											{...form.getInputProps('username')}
										/>

										{/* <Checkbox
											mt='md'
											label='I agree to send anonymous telemetry data'
											{...form.getInputProps('telemetry_opt', { type: 'checkbox' })}
										/> */}

										<Group
											justify='flex-end'
											mt='md'>
											<Button type='submit'>Submit</Button>
										</Group>
									</form>
								</Box>
							</Tabs.Panel>
						</Tabs>
					</SimpleGrid>
				</Center>
			)) || <LoadSpinner />}
		</>
	);
};

export default Settings;
