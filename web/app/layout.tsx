// Library imports
import React from "react";
import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core';

// Style imports
import '@mantine/core/styles.css';
import './globals.css'

// Component imports
import MantineClientProvider from "@/components/providers/MantineClientProvider";

export const metadata: Metadata = {
  title: 'PhantomByte',
  description: 'Cloud Based Logging Service for Modern Software Applications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineClientProvider>
            {children}
        </MantineClientProvider>
      </body>
    </html>
  )
}
