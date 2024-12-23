import React from "react";
import DarkModeMoon from "../assets/icons/dark-mode-moon.svg";
import LightModeMoon from "../assets/icons/light-mode-moon.svg";

const Header = () => {
  return (
    <>
      <nav class="bg-white px-5 w-[100vw] md:px-10 lg:px-20 py-5 flex items-center justify-between shadow-md">
        <h1 class="text-[hsl(200, 15%, 8%)] font-extrabold lg:text-xl">
          <a href="#">Where in the world</a>
        </h1>

        <button class="text-[hsl(200, 15%, 8%)] font-medium gap-1 text-[14px] flex items-center cursor-pointer md:text-[18px] md:gap-2">
          <img src={LightModeMoon} className="md:h-5 md:w-5 h-4 w-4" />
          Dark Mode
        </button>
      </nav>
    </>
  );
};

export default Header;
