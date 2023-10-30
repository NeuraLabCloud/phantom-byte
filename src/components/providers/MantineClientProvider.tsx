"use client";

import React, { FC } from "react";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  fontSmoothing: true,
  primaryColor: "violet",
  primaryShade: 8,
  defaultGradient: {
    from: "red",
    to: "blue",
    deg: 90,
  },
});

interface MantineClientProviderProps {
  children: React.ReactNode;
}

const MantineClientProvider: FC<MantineClientProviderProps> = ({
  children,
}) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme={"dark"}>
      {children}
    </MantineProvider>
  );
};

export default MantineClientProvider;
