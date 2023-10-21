import { Button, Center, Text } from "@mantine/core";
import React, { FC } from "react";
import ScreenCenter from "../components/ui/ScreenCenter";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface LogoutProps {}

const Logout: FC<LogoutProps> = ({}) => {
  const handleLogout = () => {
    supabase.auth.signOut({
      scope: "local",
    });
  };

  return (
    <>
      <ScreenCenter>
        <Center>
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
        </Center>
      </ScreenCenter>
    </>
  );
};

export default Logout;
