import React, { useState, useEffect } from 'react';
import './App.css';
import {MenuItem, FormControl, Select} from "@material-ui/core"
import InfoBox from "./InfoBox"

function App() {
  const [countries,setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  
  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((c) => ({
          name: c.country,
          value: c.countryInfo.iso2,
        }))
        countries.sort((a,b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))
        setCountries(countries);
        });
    }
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log("COUNTRY CODE>>>>>", countryCode)
    setCountry(countryCode)
  }
  
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select 
            variant="outlined"
            value={country}
            onChange={onCountryChange}
          >
          <MenuItem value="worldwide">WorldWide</MenuItem>
          {
            countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        {/* InfoBoxes title="Coronavirus cases" */}
        <InfoBox title="Corona Virus Cases" total={1000} cases={1234}/>

        {/* InfoBoxes title="Coronavirus recoveries" */}
        <InfoBox title="Corona Virus Recoveries" total={2000} cases={5678}/>

        {/* InfoBoxes title="Coronavirus deaths" */}
        <InfoBox title="Corona Virus Deaths" total={3000} cases={91012}/>
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
