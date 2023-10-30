'use client';

import React, { FC, useState } from 'react';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { useRouter } from 'next/navigation';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface ConvexClerkProviderProps {
	children: React.ReactNode;
}

const ConvexClerkProvider: FC<ConvexClerkProviderProps> = ({ children }) => {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
				layout: {
					logoPlacement: "none",
				},
			}}
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
			<ConvexProviderWithClerk
				client={convex}
				useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};

export default ConvexClerkProvider;
