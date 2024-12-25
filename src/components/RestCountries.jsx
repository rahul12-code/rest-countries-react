import React, { useState, useEffect } from "react";
import Filtering from "./Filtering";
import DisplayCountries from "./DisplayCountries";
import { useTheme } from "../App";

const RestCountries = () => {
  const { isDarkMode } = useTheme();

  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountriesData(data);
      } catch (err) {
        // console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filtering function
  const getFilteredCountries = () => {
    let filtered = countriesData;

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim())
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    if (selectedSubregion) {
      filtered = filtered.filter(
        (country) => country.subregion === selectedSubregion
      );
    }

    // Apply sorting based on selected sort order
    if (sortOrder === "Population low to high") {
      filtered = filtered.sort((a, b) => a.population - b.population);
    } else if (sortOrder === "Population high to low") {
      filtered = filtered.sort((a, b) => b.population - a.population);
    } else if (sortOrder === "Area low to high") {
      filtered = filtered.sort((a, b) => a.area - b.area);
    } else if (sortOrder === "Area high to low") {
      filtered = filtered.sort((a, b) => b.area - a.area);
    }

    return filtered;
  };

  return (
    <div
      className={`lg:p-20 lg:pt-10 p-8 max-w-9xl min-h-dvh ${
        isDarkMode ? "bg-[hsl(207,26%,17%)]" : "bg-gray-100 bg-opacity-80"
      }`}
    >
      {/* Filtering Component */}
      <Filtering
        countriesData={countriesData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedSubregion={selectedSubregion}
        setSelectedSubregion={setSelectedSubregion}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Display Countries Component */}
      <DisplayCountries
        countriesData={getFilteredCountries()} // Passing filtered data directly
        allCountriesData = {countriesData}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default RestCountries;
