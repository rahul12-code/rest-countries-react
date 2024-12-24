import React, { useState, useEffect } from "react";
import { useTheme } from "../App";
import { Link } from "react-router-dom";

const DisplayCountries = ({
  countriesData,
  allCountriesData,
  loading,
  error,
}) => {
  const { isDarkMode } = useTheme();
  if (countriesData.length === 0) {
    return (
      <p className={`text-center font-medium text-[24px] ${
        isDarkMode?"text-white":""
      }`}>
        No countries match your criteria!
      </p>
    );
  }

  if (loading)
    return (
      <p className="text-center font-medium text-[20px]">
        Loading countries data...
      </p>
    );
  if (error)
    return (
      <p className="text-center font-medium text-[20px]">Error: {error}</p>
    );

  return (
    <>
      <div className="md:grid md:grid-cols-3 xl:grid-cols-4 flex flex-col items-center gap-10 md:gap-x-10 md:gap-y-10 lg:gap-x-16 lg:gap-y-20">
        {countriesData.map((country, index) => (
          <Link
            key={index}
            className="w-[90%] md:h-[380px] lg:h-auto shadow-md md:w-full"
            to={`/${country.name?.common}`}
            state={{ country, allCountriesData }} // Pass country details using the `state` prop
          >
            <div>
              <img
                src={country.flags?.png}
                alt={country.name?.common}
                className="w-full h-40 lg:h-52 object-cover rounded-t-md"
              />
              <div
                className={`p-5 pb-10 md:pb-12 lg:pg-10 rounded-b-md ${
                  isDarkMode
                    ? "bg-[hsl(209,23%,22%)] text-[hsl(0,0%,100%)]"
                    : "bg-[hsl(0,0%,100%)] text-[hsl(200, 15%, 8%)]"
                }`}
              >
                <h2 className="font-bold text-[20px] mb-4">
                  {country.name?.common || "Unknown"}
                </h2>
                <div className="text-[16px] mb-1 flex gap-2">
                  <strong>Population:</strong>
                  {country.population || "N/A"}
                </div>
                <div className="text-[16px] mb-1 flex gap-2">
                  <strong>Region:</strong>
                  {country.region || "N/A"}
                </div>
                <div className="text-[16px] flex gap-2">
                  <strong>Capital:</strong>
                  {country.capital?.[0] || "N/A"}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DisplayCountries;
