'use client';

import { useUser } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { Id } from '../../convex/_generated/dataModel';
import { api } from '../../convex/_generated/api';
import { IConvexError, type ErrorData } from '../../convex/_shared';

const useStoreUser = () => {
	const [userId, setUserId] = useState<Id<'auth'> | null>(null);
	const [error, setError] = useState<ErrorData | null>(null);

	const { isAuthenticated } = useConvexAuth();
	const { user } = useUser();
	const storeUser = useMutation(api.auth.store);

	useEffect(() => {
		if (!isAuthenticated) {
			return;
		}
		async function createUser() {
			try {
				const id = await storeUser();
				setUserId(id);
			} catch (error) {
				error instanceof IConvexError
					? setError(error.data)
					: setError({
							code: 'Unknown',
							message: 'Unknown error',
							severity: 'High',
              where: 'useStoreUser.ts',
					  });
			}
		}
		createUser();
		return () => setUserId(null);
	}, [isAuthenticated, storeUser, user?.id]);

	return [userId, error];
};

export default useStoreUser;
