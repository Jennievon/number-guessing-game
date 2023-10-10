import React from "react";
import Button from "../Buttons";

const refreshPage = () => {
  window.location.reload();
};

const ErrorPage = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center p-4 w-full h-80">
      <div className="text-center">
        <h1 className="text-14 font-medium">Oops! Something went wrong</h1>
        <p className="flex justify-center text-12 text-gray400 font-normal mt-2 mb-4">
          Looks like something went wrong, please refresh the page.
        </p>
        <Button primary rounded onClick={refreshPage}>
          <span className="text-14 font-normal px-6">Refresh</span>
        </Button>
      </div>
    </div>
  );
};
export default ErrorPage;
