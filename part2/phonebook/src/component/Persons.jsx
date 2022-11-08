import React from 'react'
import Person from './Person'

const Persons = ({ shown, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {shown?.map(({ name, number, id }) => {
        return (
          <Person
            key={id}
            id={id}
            name={name}
            number={number}
            handleDelete={handleDelete}
          />
        )
      })}
    </div>
  )
}

export default Persons
