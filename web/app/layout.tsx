import "@mantine/core/styles.css";
import "./globals.css";

import React from "react";
import type { Metadata } from "next";
import { ColorSchemeScript } from "@mantine/core";
import MantineClientProvider from "@/components/providers/MantineClientProvider";

export const metadata: Metadata = {
	title: 'PhantomByte',
	description: 'Cloud Based Logging Service for Modern Software Applications',
	icons: ['vercel.svg'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link
          href="https://fonts.googleapis.com/css2?family=Nosifer&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MantineClientProvider>{children}</MantineClientProvider>
      </body>
    </html>
  );
}
