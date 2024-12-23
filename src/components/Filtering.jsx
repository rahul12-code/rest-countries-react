import React, { useState } from "react";
import DownArrow from "../assets/icons/down-arrow.svg";
import Search from "../assets/icons/search.svg";

const Filtering = ({
  countriesData,
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
}) => {

  const regions = [];
  countriesData.forEach((country) => {
    if (!regions.includes(country.region)) {
      regions.push(country.region);
    }
  });
  regions.unshift('Filter by Region')

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex md:pt-4 pb-12 flex-col gap-10 md:gap-0 md:flex-row md:justify-between md:items-center ">
        {/* Search Bar */}
        <div className="w-full md:w-[35%] relative p-3 px-4 rounded-lg shadow-custom bg-white flex items-center">
          <img src={Search} className="h-5 w-5 mr-5" />
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[90%] focus:outline-none"
          />
        </div>

        {/* Filter by Region Dropdown */}
        <div className="w-[60%] md:w-[20%] relative">
          <div
            className="p-3 rounded-lg shadow-custom bg-white flex justify-between items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <span>{selectedRegion}</span>
            <img src={DownArrow} className="h-5 w-5" />
          </div>
        
          {isOpen && (
            <div className="absolute top-14 left-0 w-full bg-white rounded-lg shadow-custom py-2 z-10">
              {regions.map((region, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(region)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {region}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      
    </>
  );
};

export default Filtering;
