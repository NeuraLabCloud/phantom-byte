import React, { FC } from "react";

export const dynamic = "force-dynamic";

interface ComponentProps {}

const Component: FC<ComponentProps> = async ({}) => {
  return (
    <div>
        Dashboard
    </div>
  );
};

export default Component;
