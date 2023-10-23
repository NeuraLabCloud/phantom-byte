import React, { FC } from "react";
import "./LoadingSpinner.module.css";

interface ComponentProps {}

const Component: FC<ComponentProps> = async ({}) => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner" />
    </div>
  );
};

export default Component;
