import React, { FC } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface MainContentProps {}

const MainContent: FC<MainContentProps> = ({}) => {
	const auth = useAuth();

	const user = {
		created_at: auth?.user?.created_at,
		email: auth?.user?.email,
		aud: auth?.user?.aud,
	};

	return <>{JSON.stringify(user, null, 2)}</>;
};

export default MainContent;
