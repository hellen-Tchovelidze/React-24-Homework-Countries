
interface Country {
    name: {
        common: string;
        nativeName: { [key: string]: { common: string } }; 
    };
    flags: { png: string };
    region: string;
    subregion: string;
    population: number;
    capital?: string[]; 
    borders?: string[]; 
    tld?: string[]; 
    currencies?: { [key: string]: { name: string } }; 
    languages?: { [key: string]: string }; 
}


interface CountryDetailsProps {
    country: Country; 
}

function CountryDetails({ country }: CountryDetailsProps) {
    return (
        <div className=" flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-7xl mx-auto p-6">
            
            <div className="w-full lg:w-1/2 flex justify-center">
                <img
                    src={country.flags.png}
                    alt={country.name.common}
                    className="max-w-[500px] w-full max-h-[350px] object-contain"
                />
            </div>

       
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <h1 className="text-4xl font-bold">{country.name.common}</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p><strong>Native Name:</strong> {country.name.nativeName && Object.values(country.name.nativeName)[0].common}</p>
                        <p><strong>Region:</strong> {country.region}</p>
                        <p><strong>Subregion:</strong> {country.subregion}</p>
                        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                        <p><strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}</p>
                    </div>
                    <div>
                        {country.tld && <p><strong>Top Level Domain:</strong> {country.tld.join(", ")}</p>}
                        {country.currencies && (
                            <p>
                                <strong>Currencies:</strong> {Object.values(country.currencies).map(c => c.name).join(", ")}
                            </p>
                        )}
                        {country.languages && (
                            <p>
                                <strong>Languages:</strong> {Object.values(country.languages).join(", ")}
                            </p>
                        )}
                    </div>
                </div>

                {country.borders && country.borders.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-4">
                        <h2 className="text-xl font-bold">Borders:</h2>
                        <ul className="flex flex-wrap gap-2">
                            {country.borders.map((border: string, index: number) => (
                                <li key={index} className="bg-gray-200 px-3 py-1 rounded-md text-sm">
                                    {border}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="mt-4">No borders.</p>
                )}
            </div>
        </div>
    );
}

export default CountryDetails;
