import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../App";
import BackArrow from "../assets/icons/back-arrow.svg";

const DetailPage = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation(); // Access location object
  const { country, allCountriesData } = location.state || {}; // Extract the state passed via Link

  console.log("Received state:", country);
  console.log("Countries data:", allCountriesData);

  if (!country || !allCountriesData) {
    return (
      <p className="text-center font-medium text-[20px]">
        No country data available!
      </p>
    );
  }

  // Create a map of cca3 to country names for easy lookup
  const countryMap = allCountriesData.reduce((acc, currentCountry) => {
    acc[currentCountry.cca3] = currentCountry;
    return acc;
  }, {});
  console.log(countryMap);

  return (
    <div
      className={`lg:p-20 lg:pt-10 p-8 max-w-9xl min-h-dvh ${
        isDarkMode ? "bg-[hsl(207,26%,17%)]" : "bg-gray-100 bg-opacity-80"
      }`}
    >
      <div>
        <Link to="/">
          <button
            className={`flex items-center gap-4 text-[18px] my-3 mb-16 py-1 px-6 shadow-custom rounded ${
              isDarkMode ? "bg-[hsl(209,23%,22%)] text-white" : "bg-white text-black"
            }`}
          >
            <img
              src={BackArrow}
              className={`h-5 w-5 ${isDarkMode ? "filter invert" : ""}`} // Make icon white in dark mode
            />
            Back
          </button>
        </Link>

        <div className="flex flex-col lg:flex-row items-center lg:gap-20 lg:items-start xl:justify-center">
          {/* Country Flag */}
          <div className="md:w-[30%] w-full max-h-42 lg:max-h-80">
            <img
              src={country.flags?.png}
              alt={`The flag of ${country.name?.common}`}
              className="w-full h-full"
            />
          </div>

          {/* Country Details */}
          <div
            className={`md:w-[60%] w-full leading-loose ${
              isDarkMode ? "text-white" : ""
            }`}
          >
            <h1 className="text-2xl font-bold mb-4 mt-6 lg:mt-0 sm:text-center lg:text-start">
              {country.name?.common}
            </h1>

            <div className="flex flex-col text-[18px] sm:flex-row sm:justify-center md:flex-row lg:text-start lg:justify-start md:justify-center lg:w-full gap-10 md:gap-0">
              <ul className="list-none lg:w-[50%]">
                <li>
                  <strong>Native Name: </strong>
                  <span>{country.name?.nativeName?.eng?.common || "N/A"}</span>
                </li>
                <li>
                  <strong>Population: </strong>
                  <span>{country.population.toLocaleString()}</span>
                </li>
                <li>
                  <strong>Region: </strong>
                  <span>{country.region}</span>
                </li>
                <li>
                  <strong>Sub Region: </strong>
                  <span>{country.subregion || "N/A"}</span>
                </li>
                <li>
                  <strong>Capital: </strong>
                  <span>{country.capital?.[0] || "N/A"}</span>
                </li>
              </ul>

              <ul className="list-none">
                <li>
                  <strong>Top Level Domain: </strong>
                  <span>{country.tld?.join(", ") || "N/A"}</span>
                </li>
                <li>
                  <strong>Currencies: </strong>
                  <span>
                    {Object.values(country.currencies || {}).map(
                      (currency) => `${currency.name}`
                    ) || "N/A"}
                  </span>
                </li>
                <li>
                  <strong>Languages: </strong>
                  <span>
                    {Object.values(country.languages || {}).join(", ") || "N/A"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Border Countries */}
            <div className="mt-10">
              <h2 className="text-lg font-bold mb-4 ">Border Countries:</h2>
              <div className="flex flex-wrap gap-2">
                {country.borders?.length ? (
                  country.borders.map((border, index) => {
                    const borderCountry = countryMap[border]; // border country data
                    return (
                      <Link
                        key={index}
                        to={`/${borderCountry?.name?.common}`}
                        state={{
                          country: borderCountry,
                          allCountriesData,
                        }} // Passing border country data and all countries data
                      >
                        <span
                          key={border}
                          className={`px-5 py-2 shadow-custom rounded ${
                            isDarkMode
                              ? "bg-[hsl(209,23%,22%)] text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          {borderCountry?.name?.common || "Unknown"}
                        </span>
                      </Link>
                    );
                  })
                ) : (
                  <p>No border countries</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
