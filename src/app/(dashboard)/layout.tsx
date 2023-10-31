import ParticlesClient from '@/components/providers/ParticlesClient';
import React, { FC } from 'react';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
	return <ParticlesClient>{children}</ParticlesClient>;
};

export default DashboardLayout;
