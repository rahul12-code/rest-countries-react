import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import RestCountries from "./components/RestCountries";
import DetailPage from "./components/DetailPage";
import DisplayCountries from "./components/DisplayCountries";

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
    <>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<RestCountries />} />
            <Route path="/:countryName" element={<DetailPage />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>

    </>
  );
};

export default App;
