import React, { useState, useEffect } from 'react';
import './App.css';
import {MenuItem, FormControl, Select} from "@material-ui/core"

function App() {
  const [countries,setCountries] = useState([]);
  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://api.covid19api.com/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((c) => ({
          name: c.Country,
          value: c.ISO2,
        }))
        countries.sort((a,b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))
        setCountries(countries);
        });
    }
    getCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select 
            variant="outlined"
            value="abc"
            // onChange={}
          >
          {
            countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option Two</MenuItem>
            <MenuItem value="worldwide">Option Three</MenuItem>
            <MenuItem value="worldwide">Option Four</MenuItem> */}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title */}
      {/* InfoBox */}
      {/* InfoBox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
