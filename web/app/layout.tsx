import "@mantine/core/styles.css";
import '@mantine/code-highlight/styles.css';
import "../styles/global.css";

import React from "react";
import type { Metadata } from "next";
import { ColorSchemeScript } from "@mantine/core";
import MantineClientProvider from "@/components/providers/MantineClientProvider";
import RQProvider from "@/lib/trpc/RQProvider";

export const metadata: Metadata = {
	title: 'PhantomByte',
	description: 'Cloud Based Logging Service for Modern Software Applications',
	icons: ['favicon.ico'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} suppressContentEditableWarning={true}>
      <head>
        <ColorSchemeScript />
        <link
          href="https://fonts.googleapis.com/css2?family=Nosifer&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MantineClientProvider>
            <RQProvider>
                {children}
            </RQProvider>
        </MantineClientProvider>
      </body>
    </html>
  );
}
