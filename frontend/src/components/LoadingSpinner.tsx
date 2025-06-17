import React from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner: React.FC<{ size?: "sm" | undefined; centered?: boolean }> = ({
  size,
  centered = true,
}) => {
  return (
    <div className={centered ? "d-flex justify-content-center align-items-center" : ""}>
      <Spinner animation="grow" variant="primary" size={size} />
      <Spinner animation="grow" variant="success" size={size}/>
      <Spinner animation="grow" variant="warning" size={size} />
      <Spinner animation="grow" variant="info" size={size}/>
      <Spinner animation="grow" variant="secondary" size={size}/>
    </div>
  );
};

export default LoadingSpinner;
