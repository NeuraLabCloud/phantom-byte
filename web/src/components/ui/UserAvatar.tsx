import { Avatar } from '@mantine/core';
import React, { FC } from 'react';

interface UserAvatarProps {
	provider: 'github' | 'google';
	url?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ url, provider }) => {
	const getUrl = () => {
		switch (provider) {
			case 'github':
				return url;
			case 'google':
				return url + '?sz=200';
			default:
				return url;
		}
	};

	return url ? (
		<Avatar
			src={getUrl.call(this)}
			alt="it's me"
		/>
	) : (
		<Avatar radius='xl' />
	);
};

export default UserAvatar;
