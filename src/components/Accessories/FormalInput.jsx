import React, { useState } from "react";

const FormalInputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  validationRegex,
  errorMessage = "Invalid input",
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleFocus = () => {
    setIsTouched(true);
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (validationRegex) {
      const isValidInput = validationRegex.test(value);
      setIsValid(isValidInput);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (validationRegex) {
      const isValidInput = validationRegex.test(newValue);
      setIsValid(isValidInput);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {/* Input Field */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          !isValid && isTouched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />

      {/* Error Message */}
      {!isValid && isTouched && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormalInputField;
