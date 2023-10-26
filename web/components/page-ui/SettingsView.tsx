"use client";

import React, { FC } from "react";
import { Client } from "@/lib/supabase/types";
import {
  Avatar,
  Text,
  Title,
  Paper,
  Container,
  Divider,
  Center,
} from "@mantine/core";

interface SettingsViewProps {
  client: Client;
  avatarUrl?: string;
}

const SettingsView: FC<SettingsViewProps> = ({ client, avatarUrl }) => {
  return (
    <Container size="sm">
      <Center>
        <Paper
          className="bg-zinc-900"
          shadow="lg"
          p="lg"
          style={{ maxWidth: 400, margin: "auto" }}
        >
          <div className="text-center">
            <Avatar
              size={100}
              src={avatarUrl}
              radius="xl"
              alt={client.username!}
              style={{ margin: "auto" }}
            />
            <Title order={2} style={{ marginTop: 10, marginBottom: 5 }}>
              {client.username}
            </Title>
          </div>
          <Divider m="lg" />
          <div style={{ marginBottom: 10 }}>
            <Text size="sm">User ID: {client.user_id}</Text>
            <Text size="sm">Username: {client.username}</Text>
            <Text size="sm">Role: {client.role}</Text>
            <Text size="sm">Email: {client.email}</Text>
            <Text size="sm">
              Account Created: {new Date(client.created_at).toDateString()}
            </Text>
          </div>
        </Paper>
      </Center>
    </Container>
  );
};

export default SettingsView;
