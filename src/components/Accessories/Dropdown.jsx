import React, { useEffect, useRef, useState } from "react";

const FormalDropdown = ({
  label,
  options,
  placeholder = "Select an option",
  value,
  onChange,
  required = false,
  errorMessage = "This field is required",
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const dropdownRef = useRef();

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option) => {
    setIsTouched(true);
    onChange(option);
    setSearch("");
    setIsOpen(false);
  };

  const handleBlur = () => {
    setIsTouched(true);
    setTimeout(() => setIsOpen(false), 100); // Delay to allow option click
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  // const isValid = value !== "";
  const isNumber = (val) => /^\d+$/.test(val); // allow only numeric input
  const isValid = value !== "" || /^\d+$/.test(value); // true if value contains at least one digit

  return (
    <div className="flex flex-row items-center gap-1 text-[10px]">
      {/* Label */}
      {label && (
        <label className="font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {/* Dropdown */}
      <div className="relative">
        <input
          type="text"
          value={search || value}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isNumber(search)) {
              handleSelect(search);
              e.preventDefault(); // prevent form submission if inside a form
            }
          }}
          onBlur={handleBlur}
          className={`w-full px-3 py-1 border rounded-sm focus:outline-none focus:ring-1 ${
            !isValid && isTouched && required
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-[#CB1955]"
          }`}
        />
        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow max-h-48 overflow-y-auto text-[10px]">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onMouseDown={() => handleSelect(option)}
                  className="px-3 py-[2px] hover:bg-pink-100 cursor-pointer"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-3 py-[2px] text-gray-500">No results found</li>
            )}
          </ul>
        )}
      </div>

      {!isValid && isTouched && required && (
        <p className="mt-1 text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormalDropdown;
