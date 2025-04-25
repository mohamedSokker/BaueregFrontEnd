import React from "react";

const FormalButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-1 font-semibold text-white bg-green-500 dark:bg-green-600 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-700 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default FormalButton;
