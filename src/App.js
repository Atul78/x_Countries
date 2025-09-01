import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchData = async (url, setter) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(
      "https://crio-location-selector.onrender.com/countries",
      setCountries
    );
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchData(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`,
        setStates
      );
      setSelectedState("");
      setSelectedCity("");
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetchData(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`,
        setCities
      );
      setSelectedCity("");
    }
  }, [selectedState, selectedCountry]);

  return (
    <div className="App">
      {/* Country Dropdown */}
      <select
        name="countries"
        id="countries"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">--Please choose a country--</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        name="states"
        id="states"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="">--Please choose a state--</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        name="cities"
        id="cities"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
      >
        <option value="">--Please choose a city--</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div>
        {selectedCity && selectedState && selectedCountry && (
          <h2>
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
