import { Center } from "@mantine/core";
import React, { FC } from "react";

interface ScreenCenterProps {
  children: React.ReactNode;
}

const ScreenCenter: FC<ScreenCenterProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col justify-center h-screen">
        <Center>{children}</Center>
      </div>
    </>
  );
};

export default ScreenCenter;
