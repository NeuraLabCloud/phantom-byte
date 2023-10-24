"use client";

import React, { FC, useEffect, useState } from "react";
import { Button, Text } from "@mantine/core";
import Link from "next/link";
import ScreenCenter from "@/components/ui/ScreenCenter";

interface ComponentProps {}

const Component: FC<ComponentProps> = async ({}) => {
  return (
    <ScreenCenter>
      <Button
        variant="default"
        className="mr-2 animate-pulse"
        component={Link}
        href={"/"}
      >
        <Text className="text-white">Home</Text>
      </Button>
      <form action="/auth/sign-out" method="post">
        <Button variant="outline" type="submit">
          <Text className="text-white">Logout</Text>
        </Button>
      </form>
    </ScreenCenter>
  );
};

export default Component;
