import React from "react";

const Button = ({
  className,
  children,
  loading,
  primary,
  rounded,
  onClick,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  primary?: boolean;
  rounded?: boolean;
  onClick?: () => void;
}) => {
  const baseButtonClasses = "font-bold py-2 px-4";
  const buttonClasses = ` ${baseButtonClasses} ${
    primary
      ? "bg-blue-500 hover:bg-blue-700 text-white"
      : "bg-gray-300 hover:bg-gray-400 text-gray-700"
  } ${rounded ? "rounded" : ""}`;
  const loadingClasses = "bg-gray-400 cursor-not-allowed";

  return (
    <button
      className={`${buttonClasses} ${
        loading ? loadingClasses : ""
      } ${className}`}
      disabled={loading}
      onClick={onClick}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
