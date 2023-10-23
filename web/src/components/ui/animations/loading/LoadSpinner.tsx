import React, { FC } from "react";
import "./LoadingSpinner.css";

interface LoadSpinnerProps {}

const LoadSpinner: FC<LoadSpinnerProps> = ({}) => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner" />
    </div>
  );
};

export default LoadSpinner;
