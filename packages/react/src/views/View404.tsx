import React from "react";
import Button from "../components/Buttons";
import { useNavigate } from "react-router-dom";

const View404 = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-2xl font-medium">Page not found</p>
      <Button primary rounded className="mt-4" onClick={goHome}>
        Go back home
      </Button>
    </div>
  );
};

export default View404;
