import React from "react";

const Button = ({
  className,
  children,
  loading,
  primary,
  rounded,
  onClick,
  disabled,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  primary?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const baseButtonClasses =
    "px-6 py-2 font-normal text-14 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105";
  const buttonClasses = ` ${baseButtonClasses} ${
    primary
      ? "bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
      : "bg-gray-200 text-gray-900 px-4 py-2 hover:bg-gray-300"
  } ${rounded ? "rounded-full" : "rounded-lg"} `;
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={`${buttonClasses} ${
        loading ? disabledClasses + "animate-rotate" : ""
      } ${disabled ? disabledClasses : "cursor-pointer"} ${className}`}
      disabled={loading || disabled}
      onClick={onClick}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
