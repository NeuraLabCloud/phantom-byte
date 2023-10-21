import React, { FC } from "react";

interface ScreenCenterProps {
  children: React.ReactNode;
}

const ScreenCenter: FC<ScreenCenterProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col justify-center h-screen">{children}</div>
    </>
  );
};

export default ScreenCenter;
