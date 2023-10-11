import React from "react";

const getButtonClasses = (variant: string) => {
  switch (variant) {
    case "primary":
      return "hover:bg-brand-dark";
    case "secondary":
      return "bg-gray-900 hover:bg-gray-800";
    case "outline":
      return "border-2 border-gray-900 hover:border-gray-800 hover:text-gray-800";
    case "danger":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "hover:bg-brand-dark";
  }
};

const Button = ({
  className,
  children,
  loading,
  variant,
  rounded,
  onClick,
  disabled,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "outline";
  rounded?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const baseButtonClasses = `px-6 py-2 font-bold text-14 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${className}`;
  const buttonClasses = `${baseButtonClasses} ${
    variant ? getButtonClasses(variant) : getButtonClasses("primary")
  } ${rounded ? "rounded-full" : "rounded-lg"} `;
  const disabledClasses = "opacity-50 cursor-not-allowed";
  const brand =
    "linear-gradient(90deg, rgba(133,255,196,1) 0%, rgba(0,212,255,1) 100%)";

  return (
    <button
      className={`${buttonClasses} ${
        loading ? disabledClasses + "animate-rotate" : ""
      } ${disabled ? disabledClasses : "cursor-pointer"}`}
      style={{
        background: !variant || variant === "primary" ? brand : "",
        color: variant === "outline" ? "rgba(133,255,196,1)" : "text-white",
      }}
      disabled={loading || disabled}
      onClick={onClick}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
