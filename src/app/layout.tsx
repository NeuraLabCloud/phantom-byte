import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexUserProvider from "@/components/providers/ConvexUserProvider";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";

const inter = Inter({ subsets: ["latin"], preload: true });

export const metadata: Metadata = {
  title: "Talent Tree | Freelancing",
  description: "Start Freelancing and Built your Career in Tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ConvexClerkProvider>
          <ConvexUserProvider>{children}</ConvexUserProvider>
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
