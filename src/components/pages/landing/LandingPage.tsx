'use client';

import React, { FC } from 'react';
import { useConvexAuth } from 'convex/react';
import { UserButton } from '@clerk/nextjs';
import LoadingState from '@/components/ui/LoadingState';
import Header from '@/components/ui/header/Header';

interface LandingPageProps {}

const LandingPage: FC<LandingPageProps> = async ({}) => {
	const { isAuthenticated, isLoading } = useConvexAuth();

	if (isLoading) return <LoadingState />;

	return (
		<>
			<Header isAuthUser={isAuthenticated} />
			<h1>Talent Tree</h1>
			{isAuthenticated ? (
				<UserButton afterSignOutUrl='/' />
			) : (
				'Unauthorized Access'
			)}
		</>
	);
};

export default LandingPage;
