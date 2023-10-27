'use client';

import React, { FC } from 'react';
import { useConvexAuth } from 'convex/react';
import { UserButton } from '@clerk/nextjs';

interface LandingPageProps {}

const LandingPage: FC<LandingPageProps> = async ({}) => {
	const { isAuthenticated, isLoading } = useConvexAuth();

	return (
		<>
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
