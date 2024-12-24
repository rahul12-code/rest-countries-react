import React, { useState } from "react";
import DownArrow from "../assets/icons/down-arrow.svg"; // Path to your icon

const Dropdown = ({ options, selected, onSelect, placeholder, isDarkMode }) => {

    console.log(options);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    onSelect(option); // Update the selected option
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="w-[60%] md:w-[15%] relative">
      {/* Dropdown Button */}
      <div
        className={`p-3 rounded-lg shadow-custom flex justify-between items-center cursor-pointer ${
          isDarkMode
            ? "bg-[hsl(209,23%,22%)] text-white"
            : "bg-[hsl(0,0%,100%)] text-black"
        }`}
        onClick={toggleDropdown}
      >
        <span>{selected || placeholder}</span>
        <img
          src={DownArrow}
          className={`h-5 w-5 ${isDarkMode ? "filter invert" : ""}`} // Make icon white in dark mode
          alt="Down Arrow"
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-14 left-0 w-full rounded-lg shadow-custom py-2 z-10 ${
            isDarkMode
              ? "bg-[hsl(209,23%,22%)] text-white"
              : "bg-white text-black"
          }`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer ${
                isDarkMode
                  ? "hover:bg-[hsl(207,26%,25%)]"
                  : "hover:bg-gray-100"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
