import React, { useState, useEffect } from "react";

const DisplayCountries = ({ countriesData, loading, error }) => {
  if (countriesData.length === 0) {
    return (
      <p className="text-center font-medium text-[20px]">
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
          <div
            key={index}
            className="border w-[90%] md:h-[380px] lg:h-auto shadow-md rounded-md md:w-full"
          >
            <img
              src={country.flags?.png}
              className="w-full h-40 lg:h-52 object-cover rounded-t-md"
            />
            <div className="p-5 pb-10 md:pb-12 lg:pg-10 bg-white">
              <h2 className="font-bold text-[20px] mb-4">
                {country.name?.common || "Unknown"}
              </h2>
              <h3 className="text-[16px] mb-1 flex gap-2">
                <h3 className="font-semibold">Population:</h3>
                {country.population || "N/A"}
              </h3>
              <h3 className="text-[16px] mb-1 flex gap-2">
                <h3 className="font-semibold">Region:</h3>
                {country.region || "N/A"}
              </h3>
              <h3 className="text-[16px] flex gap-2">
                <h3 className="font-semibold">Capital:</h3>
                {country.capital?.[0] || "N/A"}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayCountries;
