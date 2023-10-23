import React, { FC } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabase";
import ScreenCenter from "../components/ui/ScreenCenter";
import { Button, Center, Container, Title } from "@mantine/core";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get("redirect");
  const redirectPath = redirect ? redirect : "/dashboard";
  const fullUrl = window.location.origin + redirectPath;

  return (
    <ScreenCenter>
      <Container>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["github", "google"]}
          onlyThirdPartyProviders={true}
          theme="dark"
          redirectTo={fullUrl}
        />
        <Center>
          <Button variant="outline" size="xs" component={Link} to={"/"}>
            <Title className="text-zinc-300 text-lg">Home</Title>
          </Button>
        </Center>
      </Container>
    </ScreenCenter>
  );
};

export default Login;
