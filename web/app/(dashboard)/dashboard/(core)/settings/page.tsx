import SettingsView from '@/components/page-ui/SettingsView';
import { trpc } from '@/lib/trpc/server/client';
import React, { FC } from 'react';

// needed to avoid https://nextjs.org/docs/messages/dynamic-server-error error on build
export const dynamic = 'force-dynamic';

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	const currentUser = await trpc.client.get.query();
	const metaData = await trpc.meta.get.query();

	return (
		<>
			<SettingsView
				client={currentUser!}
				avatarUrl={metaData.avatar_url}
			/>
		</>
	);
};

export default page;
