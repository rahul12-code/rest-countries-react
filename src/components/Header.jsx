import React from "react";
import DarkModeMoon from "../assets/icons/dark-mode-moon.svg";
import LightModeMoon from "../assets/icons/light-mode-moon.svg";
import { useTheme } from "../App";
import { Link } from "react-router-dom";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <nav
        className={`px-5 w-[100vw] md:px-10 lg:px-20 py-5 flex items-center justify-between shadow-md ${
          isDarkMode
            ? "bg-[hsl(209,23%,22%)] text-[hsl(0,0%,100%)] shadow-black"
            : "bg-[hsl(0,0%,100%)] text-[hsl(200, 15%, 8%)]"
        }`}
      >
        <h1 className="font-extrabold lg:text-xl md:text-[20px]">
          <Link to="/">Where in the world?</Link>
        </h1>

        <button
          onClick={toggleTheme}
          className="font-medium gap-1 text-[14px] flex items-center cursor-pointer md:text-[18px] md:gap-2"
        >
          <img
            src={isDarkMode ? DarkModeMoon : LightModeMoon}
            className="md:h-5 md:w-5 h-4 w-4"
            alt="Mode Icon"
          />
          Dark Mode
        </button>
      </nav>
    </>
  );
};

export default Header;
