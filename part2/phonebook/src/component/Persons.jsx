import React from 'react'
import Person from './Person'

const Persons = ({ shown }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {shown?.map(({ name, phone }) => {
        return <Person name={name} phone={phone} />
      })}
    </div>
  )
}

export default Persons
