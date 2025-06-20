import React, { useEffect, useRef, useState } from "react";

const FormalDropdown = ({
  label,
  options,
  placeholder = "Select an option",
  value: selectedValue = "",
  onChange,
  required = false,
  errorMessage = "This field is required",
  inputClassName = "",
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track highlighted item
  const dropdownRef = useRef();
  const listRef = useRef([]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option);
    setSearch("");
    setIsTouched(true);
    setIsOpen(false);
  };

  const handleBlur = () => {
    setIsTouched(true);
    setTimeout(() => setIsOpen(false), 100);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelect(filteredOptions[highlightedIndex]);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Scroll into view when highlighted index changes
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current[highlightedIndex]) {
      listRef.current[highlightedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isValid = selectedValue !== ""; // Only validate based on selectedValue

  return (
    <div
      className="w-full flex flex-col gap-1 text-[10px] dark:bg-gray-700"
      ref={dropdownRef}
    >
      {/* Label */}
      {label && (
        <label className="font-medium text-gray-700 dark:text-white">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {/* Dropdown Input */}
      <div className="relative flex justify-between items-center gap-1">
        <input
          type="text"
          value={selectedValue || search}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            onChange(e.target.value); // optional: allow free text input
            setHighlightedIndex(-1);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={
            !inputClassName
              ? `w-full px-3 py-1 border rounded-sm focus:outline-none focus:ring-1 dark:bg-gray-700 dark:text-white ${
                  !isValid && isTouched && required
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#CB1955]"
                }`
              : inputClassName
          }
        />
        {isOpen && (
          <ul
            role="listbox"
            className="absolute top-6 z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow max-h-48 overflow-y-auto text-[10px]"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  role="option"
                  aria-selected={selectedValue === option}
                  onMouseDown={() => handleSelect(option)}
                  ref={(el) => (listRef.current[index] = el)} // Refs for scrolling
                  className={`px-3 py-[2px] cursor-pointer ${
                    highlightedIndex === index
                      ? "bg-pink-100 dark:bg-[#CB1955]"
                      : "hover:bg-pink-50 dark:hover:bg-[#CB1955]"
                  }`}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-3 py-[2px] text-gray-500">No results found</li>
            )}
          </ul>
        )}
        {!isValid && isTouched && required && (
          <p className="mt-1 text-red-500 text-xs min-w-[120px] truncate">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormalDropdown;
