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
    <div className="flex flex-row items-center gap-2 text-[10px]">
      {/* Label */}
      {label && (
        <label className="font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {/* Dropdown */}
      <select
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`px-2 py-1 border rounded-sm focus:outline-none focus:ring-1 ${
          !isValid && isTouched && required
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#CB1955]"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {!isValid && isTouched && required && (
        <p className="text-[10px] text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormalDropdown;
