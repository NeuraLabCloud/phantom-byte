import React, { FC } from 'react';
import { Loader } from '@mantine/core';
import FullCenter from "@/components/ui/FullCenter"

interface LoadingStateProps {}

const LoadingState: FC<LoadingStateProps> = async ({}) => {
	return (
		<FullCenter>
			<Loader
				size='xl'
				type='dots'
			/>
		</FullCenter>
	);
};

export default LoadingState;
