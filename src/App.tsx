
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import FlagPage from "./Pages/FlagPage/FlagPage";
import { useCountryStore } from "./store/useCountryStore";
import MoonIcon from './assets/images/sun.png'
import SunIcon from './assets/images/dark.png'
function App() {
  const { mode, toggleMode } = useCountryStore();

  return (
    <Router>
      <div className={`min-h-screen ${mode === 'dark' ? 'bg-gray-900' : 'bg-white'} text-${mode === 'dark' ? 'white' : 'black'}`}>
    
        <div className="flex items-center justify-between p-5">
          <h1 className="text-4xl font-bold">Where in the world?</h1>
          
          
          <button onClick={toggleMode} className="flex items-center space-x-2 p-2 rounded-md">
            <img 
              src={mode === 'dark' ? MoonIcon : SunIcon} 
              alt={mode === 'dark' ? "MoonIcon" : "SunIcon"} 
              className="w-6 h-6"
            />
            <span>{mode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:name" element={<FlagPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
