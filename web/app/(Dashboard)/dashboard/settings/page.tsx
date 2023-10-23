"use client"

import {
  Box,
  Button,
  Center,
  Group,
  SimpleGrid,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import useMetadata from "@/hooks/useMetadata";
import {useClientStore} from "@/lib/stores/client";
import {useAuth} from "@/hooks/useAuth";
import {Client} from "@/lib/types";
import LoadingSpinner from "@/components/ui/loading/LoadingSpinner";

type CurrentSettings = {
  username: string;
} | null;
interface ComponentProps {}

const Component: FC<ComponentProps> = async ({}) => {
  const [loading, setLoading] = useState(true);
  const [currentSettings, setCurrentSettings] = useState<CurrentSettings>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const metadata = useMetadata();
  const clientStore = useClientStore();
  const auth = useAuth();

  const form = useForm({
    initialValues: {
      username: "",
    },
    validate: {
      username: (value) => {
        if (value.length < 5) {
          return "Username must be at least 5 characters long";
        }
        if (value.length > 25) {
          return "Username must be less than 35 characters long";
        }
      },
    },
  });

  async function submitUpdatedClient(user_id: string, newUsername: string) {
    return fetch("/auth/v1/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  }),
    }).then((res) => res.json()).then((data) => {
        return data as Client
    })
  }

  const handleSubmit = async (values: { username: string }) => {
    setIsSubmitting(true);
    submitUpdatedClient(auth?.user?.id!, values.username).then((result) => {
      notifications.show({
        message: `Your settings have been updated successfully.`,
        color: "green",
        autoClose: 3000,
      });
      form.reset();
      clientStore.setClient(result);
        setIsSubmitting(false);
    })
  };

  useEffect(() => {
    const settings = {
      username: metadata.username,
    };

    setCurrentSettings(settings);
    setLoading(false);
  }, [metadata.username]);


  return (
      <>
        <Center>
          <Title className="mt-10">Account Settings</Title>
        </Center>
        {(!loading && currentSettings && (
            <Center className="mt-10">
              <SimpleGrid cols={1}>
                <Tabs color="teal" defaultValue="first">
                  <Tabs.List>
                    <Tabs.Tab value="first" color="blue">
                      Current
                    </Tabs.Tab>
                    <Tabs.Tab value="second" color="yellow">
                      Update
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="first" pt="xs">
                    Username:{" "}
                    <span className={"text-violet-400"}>
                  {currentSettings.username}
                </span>
                  </Tabs.Panel>

                  <Tabs.Panel value="second" pt="xs">
                    <Box maw={340} mx="auto">
                      <form onSubmit={form.onSubmit(() => handleSubmit)}>
                        <TextInput
                            withAsterisk
                            label="Update Username"
                            placeholder="Enter your username"
                            {...form.getInputProps("username")}
                        />

                        {/* <Checkbox
											mt='md'
											label='I agree to send anonymous telemetry data'
											{...form.getInputProps('telemetry_opt', { type: 'checkbox' })}
										/> */}

                        <Group justify="flex-end" mt="md">
                          {/* Disable the button during form submission */}
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </Button>
                        </Group>
                      </form>
                    </Box>
                  </Tabs.Panel>
                </Tabs>
              </SimpleGrid>
            </Center>
        )) || <LoadingSpinner />}
      </>
  );
};

export default Component;
