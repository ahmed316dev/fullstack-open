import React from 'react'
import Country from './Country'
const Countrries = ({ shown, handleShowCountry }) => {
  return (
    <div>
      {shown.map(country => {
        return (
          <Country
            handleShowCountry={handleShowCountry}
            key={country.population}
            country={country}
          />
        )
      })}
    </div>
  )
}

export default Countrries
