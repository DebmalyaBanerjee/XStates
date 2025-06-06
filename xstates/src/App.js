import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch countries on initial render
  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => console.error('Error fetching states:', error));
    } else {
      setStates([]);
      setSelectedState('');
    }
    setCities([]);
    setSelectedCity('');
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    } else {
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedState]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-2xl font-bold mb-4 text-center">Select Location</h1>
        <div className="flex space-x-4 mb-4">
          <select
            className="border border-gray-300 rounded p-2 w-1/3"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded p-2 w-1/3"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            { states.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded p-2 w-1/3"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {selectedCity && (
          <p className="text-center text-lg">
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;