"use client";

import Link from "next/link";
import ScreenCenter from "@/components/ui/ScreenCenter";
import { Button, Center, Container, Text } from "@mantine/core";
import { createClient } from "@/lib/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState, useEffect } from "react";

export default function Login() {
  const [redirectTo, setRedirectTo] = useState("");
  const supabase = createClient();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectTo(`${window.location.origin}/auth/callback`);
    }
  }, []);

  return (
    <ScreenCenter>
      <Container>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          onlyThirdPartyProviders={true}
          providers={["github", "google"]}
          redirectTo={redirectTo}
        />
        <Center>
          <Button variant="outline" size="xs" component={Link} href={"/"}>
            <Text className="text-zinc-300">Home</Text>
          </Button>
        </Center>
      </Container>
    </ScreenCenter>
  );
}
