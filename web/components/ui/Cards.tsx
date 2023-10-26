"use client";

import React, { FC } from "react";
import {
  Badge,
  Button,
  Card,
  DefaultMantineColor,
  Group,
  Text,
} from "@mantine/core";
import Link from "next/link";

interface CardsProps {
  title: string;
  description: string;
  link: string;
  color: DefaultMantineColor;
  underConstruction: boolean;
  btnText: string;
}

const Cards: FC<CardsProps> = async ({
  title,
  description,
  link,
  color,
  underConstruction,
  btnText,
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="mb-5">
      <Group p="apart" mt="md" mb="xs">
        <Text w={500}>{title}</Text>
        {(underConstruction && (
          <Badge color="pink" variant="light">
            Coming soon
          </Badge>
        )) ||
          null}
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Button
        variant="light"
        color={color}
        fullWidth
        mt="md"
        radius="md"
        component={Link}
        href={link}
        disabled={underConstruction}
      >
        {btnText}
      </Button>
    </Card>
  );
};

export default Cards;
