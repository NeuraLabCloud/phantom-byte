import { Loader } from '@mantine/core';
import React, { FC } from 'react';

interface loadingProps {}

const loading: FC<loadingProps> = async ({}) => {
	return (
		<Loader
			size='xl'
			type='dots'
		/>
	);
};

export default loading;
