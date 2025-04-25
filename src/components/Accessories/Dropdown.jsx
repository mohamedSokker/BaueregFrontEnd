import React, { useState } from "react";

const FormalDropdown = ({
  label,
  options,
  placeholder = "Select an option",
  value,
  onChange,
  required = false,
  errorMessage = "This field is required",
}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  const isValid = value !== "";

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {/* Dropdown */}
      <select
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          !isValid && isTouched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {!isValid && isTouched && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormalDropdown;
