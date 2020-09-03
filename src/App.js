import React, { useState, useEffect } from 'react';
import './App.css';
import {Card, MenuItem, FormControl, Select, CardContent} from "@material-ui/core"
import InfoBox from "./InfoBox"
import Map from "./Map"
import Table from "./Table"
import {sortData, prettyPrintStat} from "./util"
import LineGraph from "./LineGraph"
import "leaflet/dist/leaflet.css"


function App() {
  const [countries,setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  
  // This allows the page to initialize to get the stats for ALL cases ON START UP
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  }, [])

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((c) => ({
          name: c.country,
          value: c.countryInfo.iso2,
        }));
        const sortedData = sortData(data)
        setTableData(sortedData)
        setCountries(countries);
        setMapCountries(data)
        });
        
    }
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value

    const url = countryCode === "worldwide"
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}` 

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      setCountryInfo(data)
      setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      setMapZoom(4)
    })

    console.log("COUNTRY INFO >>>>", countryInfo)
  }
  
  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="Corona Virus Cases" total={prettyPrintStat(countryInfo.cases)} cases={prettyPrintStat(countryInfo.todayCases)}/>

          {/* InfoBoxes title="Coronavirus recoveries" */}
          <InfoBox title="Corona Virus Recoveries" total={prettyPrintStat(countryInfo.recovered)} cases={prettyPrintStat(countryInfo.todayRecovered)}/>

          {/* InfoBoxes title="Coronavirus deaths" */}
          <InfoBox title="Corona Virus Deaths" total={prettyPrintStat(countryInfo.deaths)} cases={prettyPrintStat(countryInfo.todayDeaths)}/>
        </div>

        {/* Header */}
        {/* Title */}
        {/* InfoBox */}
        {/* InfoBox */}

        {/* Map */}
        <Map 
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData}/>
          {/* Graph */}
          <LineGraph />
          <h3>WorldWide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
