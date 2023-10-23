import {
	Box,
	Button,
	Center,
	Checkbox,
	Group,
	SimpleGrid,
	Tabs,
	TextInput,
	Title,
} from '@mantine/core';
import React, { FC } from 'react';
import { useForm } from '@mantine/form';
import { IconPhoto, IconMessageCircle } from '@tabler/icons-react';

interface SettingsProps {}

const Settings: FC<SettingsProps> = ({}) => {
	const form = useForm({
		initialValues: {
			username: '',
			telemetry_opt: false,
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

	const handleSubmit = (values: {
		username: string;
		telemetry_opt: boolean;
	}) => {
		// Todo - update user settings
		console.table(values);
	};

	return (
		<>
			<Center>
				<Title className='mt-10'>Account Settings</Title>
			</Center>
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
							coming soon
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

									<Checkbox
										mt='md'
										label='I agree to send anonymous telemetry data'
										{...form.getInputProps('telemetry_opt', { type: 'checkbox' })}
									/>

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
		</>
	);
};

export default Settings;
