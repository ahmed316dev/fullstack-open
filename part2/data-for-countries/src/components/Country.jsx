import React from 'react'

const Country = ({ country, handleShowCountry }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <button onClick={() => handleShowCountry(country.name.common)}>
        show
      </button>
    </div>
  )
}

export default Country
