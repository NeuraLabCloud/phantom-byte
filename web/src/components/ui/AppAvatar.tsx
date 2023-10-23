import React, { FC } from "react";
import { Avatar, MantineRadius } from "@mantine/core";
import { Link } from "react-router-dom";

interface AppAvatarProps {
  radius?: MantineRadius;
}

const AppAvatar: FC<AppAvatarProps> = ({ radius }) => {
  return (
    <>
      <Avatar
        component={Link}
        to={"/"}
        // src="logo-no-bg.png"
        alt="App Logo"
        radius={radius ?? "sm"}
      >
      </Avatar>
    </>
  );
};

export default AppAvatar;
