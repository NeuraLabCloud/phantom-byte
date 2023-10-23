import React, { FC } from 'react';
import { Avatar } from '@mantine/core';
import { Link } from 'react-router-dom';
import useMetadata from '../../hooks/useMetadata';

interface UserAvatarProps {}

const UserAvatar: FC<UserAvatarProps> = ({}) => {
	const { avatar_url } = useMetadata();

	return (
		<Avatar
			src={avatar_url}
			alt='User Avatar'
			component={Link}
			to={'/dashboard/settings'}
		/>
	);
};

export default UserAvatar;
