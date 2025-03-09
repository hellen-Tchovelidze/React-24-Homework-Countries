
import { create } from 'zustand';

interface Country {
  name: { common: string; nativeName: { [key: string]: { common: string } } };
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


interface CountryStore {
  countries: Country[];
  fetchCountries: () => Promise<void>;
  mode: 'light' | 'dark';
  toggleMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useCountryStore = create<CountryStore>((set) => {
 
  const storedMode = localStorage.getItem("mode") as 'light' | 'dark' | null;
  const initialMode = storedMode ? storedMode : 'light';

  return {
    countries: [],
    fetchCountries: async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      set({ countries: data });
    },
    mode: initialMode,
    toggleMode: () =>
      set((state) => {
        const newMode = state.mode === 'light' ? 'dark' : 'light';
        localStorage.setItem("mode", newMode); 
        return { mode: newMode };
      }),
    searchQuery: '',
    setSearchQuery: (query: string) => set({ searchQuery: query }),
  };
});
