"use client";

import React, { FC } from "react";
import useStoreUser from "@/hooks/useStoreUser";

interface ConvexUserProviderProps {
  children: React.ReactNode;
}

const ConvexUserProvider: FC<ConvexUserProviderProps> = ({ children }) => {
  useStoreUser();
  return <>{children}</>;
};

export default ConvexUserProvider;
