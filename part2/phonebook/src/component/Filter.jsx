import React from 'react'

const Filter = ({ search, setSearch }) => {
  return (
    <>
      <div>search</div>
      <input
        type="name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </>
  )
}

export default Filter
