"use client"

import React, { FC } from "react";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
    fontFamily: "Open Sans, sans-serif",
    primaryColor: "violet",
});

interface ComponentProps {
    children: React.ReactNode;
}

const Component: FC<ComponentProps> = ({ children }) => {
    return (
        <MantineProvider theme={theme} defaultColorScheme={"dark"}>
            {children}
        </MantineProvider>
    );
};

export default Component;
