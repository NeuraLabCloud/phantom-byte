'use client'

import React, { FC } from "react";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {Database} from "@/lib/schema";
import {supabaseConfig} from "@/lib/supabase";
import ScreenCenter from "@/components/ui/ScreenCenter";
import {Button, Center, Container, Text} from "@mantine/core"
import Link from "next/link";

interface ComponentProps {}

const Component: FC<ComponentProps> = ({}) => {
  const supabase = createClientComponentClient<Database>({
    supabaseUrl: supabaseConfig.supabaseUrl,
    supabaseKey: supabaseConfig.supabaseKey,
  })

  return (
      <ScreenCenter>
       <Container>
           <Auth
               supabaseClient={supabase}
               appearance={{ theme: ThemeSupa }}
               theme="dark"
               onlyThirdPartyProviders={true}
               providers={["github", "google"]}
               redirectTo={`${window.location.origin}/auth/v1/callback`}
           />
           <Center>
               <Button variant="outline" size="xs" component={Link} href={"/"}>
                   <Text className="text-zinc-300">Home</Text>
               </Button>
           </Center>
       </Container>
      </ScreenCenter>
  )
};

export default Component;
