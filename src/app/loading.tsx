import React, { FC } from 'react';
import LoadingState from '@/components/ui/LoadingState';

interface loadingProps {}

const loading: FC<loadingProps> = async ({}) => {
	return <LoadingState />;
};

export default loading;
