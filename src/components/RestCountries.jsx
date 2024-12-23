import React, { useState, useEffect } from "react";
import Filtering from "./Filtering";
import DisplayCountries from "./DisplayCountries";

const RestCountries = () => {

  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");

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
        console.error("Fetch error:", err);
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
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }
  
    if (selectedRegion !== "Filter by Region") {
      filtered = filtered.filter((country) => country.region === selectedRegion);
    }
  
    return filtered;
  };
  

  return (
    <div className="bg-gray-100 bg-opacity-80 lg:p-20 lg:pt-10 p-8 max-w-9xl min-h-dvh">
      {/* Filtering Component */}
      <Filtering
        countriesData={countriesData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

      {/* Display Countries Component */}
      <DisplayCountries
        countriesData={getFilteredCountries()} // Passing filtered data directly
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default RestCountries;
