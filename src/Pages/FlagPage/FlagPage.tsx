


import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useCountryStore } from "../../store/useCountryStore"; 
import CountryDetails from "../../components/CountryDetails/CountryDetails"; 

function FlagPage() {
  const { name } = useParams<{ name: string }>();
  const { countries, fetchCountries, mode } = useCountryStore(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries(); 
    }
  }, [countries.length, fetchCountries]);

  const country = countries.find(
    (c) => c.name.common.toLowerCase() === name?.toLowerCase()
  );

  if (!country) {
    return <div className="text-center text-lg font-semibold text-white">Loading...</div>;
  }

  return (
    <div className={` overflow-hidden ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} p-8`}>
     
      <button 
        onClick={() => navigate(-1)} 
        className={`mb-4 p-2  ${mode === 'dark' ? 'bg-[#2B3844] text-white' : 'bg-white text-black'}`}
      >
        Go Back
      </button>

      
      <CountryDetails country={country} />
    </div>
  );
};

export default FlagPage;
