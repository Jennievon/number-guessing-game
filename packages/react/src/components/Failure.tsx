import React from "react";

function SuccessPage({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <svg
          className="w-16 h-16 mx-auto text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-2xl font-bold mt-4">Congratulations!</h1>
        <p className="text-gray-600 mt-2">{message}</p>
      </div>
    </div>
  );
}

export default SuccessPage;
