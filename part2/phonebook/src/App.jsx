import React, { useEffect, useState } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [shown, setShown] = useState(persons)

  const handleSubmit = e => {
    e.preventDefault()
    if (persons.some(({ name }) => name === newName)) {
      alert(`"${newName}" is already added to the phonebook`)
      setNewName('')
      setNewPhone('')

      return
    }
    setPersons(persons.concat({ name: newName, phone: newPhone }))
    setNewName('')
    setNewPhone('')
  }

  useEffect(() => {
    if (search === '') {
      setShown(persons)
    } else if (search !== '') {
      setShown(
        persons.filter(({ name }) =>
          name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      )
    }
  }, [search, persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
      />
      <Persons shown={shown} />
    </div>
  )
}

export default App
