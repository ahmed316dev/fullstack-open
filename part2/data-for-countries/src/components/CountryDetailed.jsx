import React from 'react'

const CountryDetailed = ({ country, currentWeather }) => {
  const { temp, condition, icon, wind } = currentWeather
  return (
    <div>
      <h1>{country.name.common}</h1>
      <h3>{country.name.official}</h3>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Languages:</p>
      <ol>
        {Object.entries(country.languages).map(([short, long]) => {
          return <li key={short}>{long}</li>
        })}
      </ol>
      <div>
        <img
          src={country.flags.png}
          alt={`${country.demonyms.eng.m} Flag (Flag of ${country.name.common})`}
        />
      </div>

      <div>
        <h3>{country.name.common} now</h3>
        <h4>
          {condition} {temp} °C
        </h4>
        <img src={icon} alt={`${condition} wather icon`} />
        wind speed: {wind} k/h
      </div>
    </div>
  )
}
export default CountryDetailed
