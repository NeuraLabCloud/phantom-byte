import React, { FC, useEffect } from "react";
import { Button, Text } from "@mantine/core";
import ScreenCenter from "../components/ui/ScreenCenter";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useClientAuthStore } from "../lib/stores/client";
import { notifications } from "@mantine/notifications";

interface LogoutProps {}

const Logout: FC<LogoutProps> = ({}) => {
  const [logoutTriggered, setLogoutTriggered] = React.useState(false);
  const clientAuthStore = useClientAuthStore();

  const handleLogout = () => {
    const id = notifications.show({
      loading: true,
      title: "Logging out...",
      message: "Please wait while we log you out.",
      color: "yellow",
      autoClose: false,
      withCloseButton: false,
    });

    supabase.auth
      .signOut({
        scope: "local",
      })
      .then(() => {
        notifications.update({
          id,
          title: "Logged out!",
          message: "You have been logged out.",
          color: "violet",
          loading: false,
          autoClose: 3000,
          withCloseButton: true,
        });
        setLogoutTriggered(true);
      });
  };

  useEffect(() => {
    if (logoutTriggered) {
      clientAuthStore.setAuthenticated("unauthenticated");
    }
  }, [logoutTriggered]);

  return (
    <>
      <ScreenCenter>
        <Button
          className="mr-2 animate-pulse"
          variant="default"
          component={Link}
          to={"/"}
        >
          <Text className="text-white">Home</Text>
        </Button>
        <Button
          variant="outline"
          component={Link}
          to={"/"}
          onClick={handleLogout}
        >
          <Text className="text-white">Logout</Text>
        </Button>
      </ScreenCenter>
    </>
  );
};

export default Logout;
