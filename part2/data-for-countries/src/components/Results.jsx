import React from 'react'
import Countrries from './Countrries'
import CountryDetailed from './CountryDetailed'

const Results = ({ shown, search, handleShowCountry, currentWeather }) => {
  if (shown.length === 1) {
    const [detailedCountry] = shown
    return (
      <CountryDetailed
        currentWeather={currentWeather}
        country={detailedCountry}
      />
    )
  } else if (!search) {
    return <div>Search counctries</div>
  } else if (shown.length > 10) {
    return <div>Too many matches, be more specific</div>
  } else if (shown.length < 10) {
    return <Countrries handleShowCountry={handleShowCountry} shown={shown} />
  }
}

export default Results
