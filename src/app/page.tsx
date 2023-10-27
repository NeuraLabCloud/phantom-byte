"use client";

import { useConvexAuth } from "convex/react";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Talent Tree</h1>
      {isAuthenticated ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        "Unauthorized Access"
      )}
    </>
  );
}
