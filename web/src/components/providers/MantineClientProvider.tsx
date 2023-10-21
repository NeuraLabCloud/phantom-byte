import { MantineProvider, createTheme } from '@mantine/core';
import React, { FC } from 'react';

const theme = createTheme({
	fontFamily: 'Open Sans, sans-serif',
	primaryColor: 'violet',
});

interface MantineClientProviderProps {
	children: React.ReactNode;
}

const MantineClientProvider: FC<MantineClientProviderProps> = ({
	children,
}) => {
	return (
		<>
			<MantineProvider
				theme={theme}
				defaultColorScheme='dark'>
				{children}
			</MantineProvider>
		</>
	);
};

export default MantineClientProvider;
