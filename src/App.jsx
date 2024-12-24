import React, { useState, createContext, useContext } from "react";
import Header from "./components/Header";
import RestCountries from "./components/RestCountries";

// Create Theme Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <Header />
      <RestCountries />
    </ThemeContext.Provider>
  );
};

export default App;
