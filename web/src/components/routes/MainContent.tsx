import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import Settings from '../../routes/dashboard/Settings';

type PathNames = '/dashboard' | '/dashboard/settings';

interface MainContentProps {}

const MainContent: FC<MainContentProps> = ({}) => {
	const location = useLocation();
	const pathName = location.pathname as PathNames;

	const renderContent = () => {
		switch (pathName) {
			case "/dashboard":
				return <div>Dashboard</div>;
			case '/dashboard/settings':
				return <Settings />;
			default:
				return <div>Not Found</div>;
		}
	};

	return <>{renderContent()}</>;
};

export default MainContent;
