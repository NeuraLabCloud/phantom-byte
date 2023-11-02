import React, { FC } from 'react';
import ProjectHeader from '@/components/ui/header/ProjectHeader';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
	return (
		<>
			<ProjectHeader data={null} />
			{children}
		</>
	);
};

export default DashboardLayout;
