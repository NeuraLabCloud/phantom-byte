import React, { FC } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabase";
import { Center } from "@mantine/core";
import ScreenCenter from "../components/ui/ScreenCenter";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <>
      <ScreenCenter>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["github", "google"]}
            onlyThirdPartyProviders={true}
            theme="dark"
            redirectTo="/dashboard"
          />
      </ScreenCenter>
    </>
  );
};

export default Login;
