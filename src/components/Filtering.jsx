import React, { useState } from "react";
import Search from "../assets/icons/search.svg";
import { useTheme } from "../App";
import Dropdown from "./Dropdown";

const Filtering = ({
  countriesData,
  searchQuery,
  setSearchQuery,

  selectedRegion,
  setSelectedRegion,
  selectedSubregion,
  setSelectedSubregion,
  sortOrder,
  setSortOrder,
}) => {
  const { isDarkMode } = useTheme();

  const regions = [...new Set(countriesData.map((country) => country.region))];

  // Extract subregions based on the selected region
  const getSubregions = (region) => {
    const subregions = [
      ...new Set(
        countriesData
          .filter((country) => country.region === region)
          .map((country) => country.subregion)
      ),
    ];
    // console.log("Subregions for region:", region, subregions);
    return subregions;
  };

  const sortCountries = ['Population low to high','Population high to low','Area low to high','Area high to low']

  return (
    <>
      <div className="flex md:pt-4 pb-12 flex-col gap-8  md:flex-row  md:items-center ">
        {/* Search Bar */}
        <div
          className={`w-full md:w-[30%] md:mr-60 relative p-3 px-4 rounded-lg shadow-custom flex items-center ${
            isDarkMode
              ? "bg-[hsl(209,23%,22%)] text-white"
              : "bg-[hsl(0,0%,100%)] text-black"
          }`}
        >
          <img
            src={Search}
            className={`h-5 w-5 mr-5 ${isDarkMode ? "filter invert brightness-0" : "text-gray-500"}`} // Make icon white in dark mode using filter
          />
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-[90%] focus:outline-none ${
              isDarkMode
                ? "bg-[hsl(209,23%,22%)] text-white placeholder-white"
                : "bg-[hsl(0,0%,100%)] text-black"
            }`}
          />
        </div>

        {/* Dropdown For Region */}
        <Dropdown
          options={regions}
          selected={selectedRegion}
          onSelect={(region) => {
            setSelectedRegion(region)
            setSelectedSubregion('')
          }}
          placeholder={'Filter By Region'}
          isDarkMode={isDarkMode}
        />

        {/* Dropdown For Subregion */}
        {(selectedRegion && selectedRegion!=='Antarctic') ? (
          
          <Dropdown
            options={getSubregions(selectedRegion)}
            selected={selectedSubregion}
            onSelect={(subregion) => setSelectedSubregion(subregion)}
            placeholder={'Filter By Subregion'}
            isDarkMode={isDarkMode}
          />
        ) : (
          ""
        )}

        {/* Dropdown For SortCountries */}
        <Dropdown
          options={sortCountries}
          selected={sortOrder}
          onSelect={(order) => {
            setSortOrder(order)
          }}
          placeholder={'Sort Countries'}
          isDarkMode={isDarkMode}
        />

      </div>
    </>
  );
};

export default Filtering;
