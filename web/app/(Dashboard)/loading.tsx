import React, { FC } from "react";
import LoadingSpinner from "@/components/ui/loading/LoadingSpinner";

interface ComponentProps {}

const Component: FC<ComponentProps> = async ({}) => {
  return (
        <LoadingSpinner />
  );
};

export default Component;
