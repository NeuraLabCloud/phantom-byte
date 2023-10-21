import React, { FC } from "react";
import { useAuth } from "../../hooks/useAuth";
import UserAvatar from "../ui/UserAvatar";

interface MainContentProps {}

const MainContent: FC<MainContentProps> = ({}) => {
  const auth = useAuth();

  const user = {
    created_at: auth?.user?.created_at,
    email: auth?.user?.email,
    aud: auth?.user?.aud,
    av: auth?.user?.user_metadata?.avatar_url,
    role: auth?.client?.role,
  };

  return (
    <>
      <UserAvatar
        url={user.av}
        provider={auth?.user?.app_metadata.provider as any}
      />
      <br />
      {JSON.stringify(user, null, 2)}
    </>
  );
};

export default MainContent;
