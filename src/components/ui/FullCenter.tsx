'use client';

import React, { FC } from 'react';
import { Center } from '@mantine/core';

interface FullCenterProps {
	children: React.ReactNode;
}

const FullCenter: FC<FullCenterProps> = ({ children }) => {
	return (
		<div className='flex flex-col justify-center h-screen'>
			<Center>{children}</Center>
		</div>
	);
};

export default FullCenter;
