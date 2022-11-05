import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Query from './components/Query'
import Results from './components/Results'
const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [shown, setShown] = useState([])
  const [search, setSearch] = useState('')
  const [currentWeather, setCurrentWeather] = useState({})

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setAllCountries(res.data))
  }, [])

  useEffect(() => {
    const searchMatches = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )

    setShown(searchMatches)
  }, [search, allCountries])

  const handleShowCountry = countryName => {
    const coutnryToShow = shown.filter(
      country => country.name.common === countryName
    )
    setShown(coutnryToShow)
  }

  // get weather data

  useEffect(() => {
    if (shown.length === 1) {
      const [lat, lng] = shown[0]['latlng']
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: `${lat},${lng}` },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      }
      axios
        .request(options)
        .then(res => {
          const { temp_c, condition, wind_kph } = res.data.current
          setCurrentWeather({
            temp: temp_c,
            condition: condition.text,
            icon: condition.icon,
            wind: wind_kph,
          })
        })
        .catch(err => console.log(err))
    }
  }, [shown])

  return (
    <div>
      <Query handleSearch={handleSearch} search={search} />
      <Results
        handleShowCountry={handleShowCountry}
        shown={shown}
        search={search}
        currentWeather={currentWeather}
      />
    </div>
  )
}

export default App
