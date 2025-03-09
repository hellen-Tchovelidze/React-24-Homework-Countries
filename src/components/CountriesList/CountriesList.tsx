

import { Link } from "react-router-dom";
import { useCountryStore } from "../../store/useCountryStore";

interface Country {
    name: { common: string };
    flags: { png: string };
    capital?: string[];
    population: number;
    region: string;
}

interface CountriesListProps {
    countries: Country[];
}

function CountriesList({ countries }: CountriesListProps) {
    const { mode } = useCountryStore();

    return (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
                <div
                    key={country.name.common}
                    className={`rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 ${mode === 'dark' ? 'bg-[#2B3844] text-white' : 'bg-[#f8f8f8] text-black'}`}
                >
                    <Link to={`/country/${country.name.common}`} className="block h-full w-full">

                        <img
                            src={country.flags.png}
                            alt={country.name.common}
                            className="w-full h-[160px] object-cover"
                        />
                        <div className="p-4 text-left">
                            <h2 className="text-xl font-semibold mb-2">{country.name.common}</h2>
                            <p className="text-sm"><span className="font-medium">Region:</span> {country.region}</p>
                            <p className="text-sm"><span className="font-medium">Population:</span> {country.population.toLocaleString()}</p>
                            <p className="text-sm"><span className="font-medium">Capital:</span> {country.capital?.join(", ") || "N/A"}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CountriesList;
