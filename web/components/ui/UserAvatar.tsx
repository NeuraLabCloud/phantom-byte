import React, { FC } from "react";
import { Avatar } from "@mantine/core";
import Link from "next/link"
import useMetadata from "../../hooks/useMetadata";

interface UserAvatarProps {}

const UserAvatar: FC<UserAvatarProps> = ({}) => {
    const { avatar_url } = useMetadata();

    return (
        <Avatar
            src={avatar_url}
            alt="User Avatar"
            component={Link}
            href={"/dashboard/settings"}
        />
    );
};

export default UserAvatar;