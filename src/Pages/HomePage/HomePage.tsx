

import React, { useEffect, useState } from "react";
import { useCountryStore } from "../../store/useCountryStore"; 
import CountriesList from "../../components/CountriesList/CountriesList"; 

function HomePage () {
    const { countries, fetchCountries, mode, searchQuery, setSearchQuery } = useCountryStore();
    const [selectedContinent, setSelectedContinent] = useState<string>("");
  
    useEffect(() => {
      if (countries.length === 0) {
        fetchCountries();
      }
    }, [countries.length, fetchCountries]);
  
    const filteredCountries = countries.filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = selectedContinent ? country.region.toLowerCase() === selectedContinent.toLowerCase() : true;
      return matchesSearch && matchesContinent;
    });
  
    return (
      <div className={`min-h-screen p-4 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} flex flex-col items-center`}>
       
        <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          
          <input
            type="text"
            placeholder="Search for a country…"
            className={`p-2 rounded-md w-full md:max-w-[300px] ${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
  
          <select 
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
            className={`p-2  h-[56px] rounded-md w-full md:max-w-[300px] ${mode === 'dark' ? 'bg-[#2B3844] text-white' : 'bg-[#0000000E] text-black'}`}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
  
      
        <CountriesList countries={filteredCountries} />
      </div>
    );
  }
  
  export default HomePage;
  