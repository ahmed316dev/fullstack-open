import React from 'react'

const Query = ({ search, handleSearch }) => {
  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  )
}

export default Query
