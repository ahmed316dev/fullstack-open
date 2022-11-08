import React, { useEffect, useState } from 'react'
import PersonForm from './component/PersonForm'
import Filter from './component/Filter'
import Persons from './component/Persons'
import ErrorMsg from './component/ErrorMsg'
import {
  createNew,
  deletePerson,
  getAll,
  updatePerson,
} from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [shown, setShown] = useState(persons)
  const [msgText, setMsgText] = useState('')
  const [isMsgTxtSuccess, setIsMsgTxtSuccess] = useState(null)

  const handleDelete = id => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${
          persons.find(person => person.id === id).name
        }"?`
      )
    )
      return
    deletePerson(id)
      .then(res => {
        setIsMsgTxtSuccess(true)
        setMsgText('Person has been successfully removed from the server')
      })
      .catch(err => {
        setIsMsgTxtSuccess(false)
        setMsgText('Person has already been removed from the server')
      })

    setPersons([...persons.filter(person => person.id !== id)])
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (persons.some(({ name }) => name === newName)) {
      if (!window.confirm(`Do you want to update the number of "${newName}"?`))
        return
      const { id, name } = persons.find(person => person.name === newName)
      updatePerson(id, { name: name, number: newPhone })
        .then(updatedPerson => {
          setPersons(
            persons.map(person => {
              if (person.id === updatedPerson.id) {
                person.number = updatedPerson.number
              }
              return person
            })
          )
        })
        .catch(err => {
          setIsMsgTxtSuccess(false)
          setMsgText('Person does not exist on the server')
          setTimeout(() => {
            setMsgText('')
          }, 5000)
          setNewName('')
          setNewPhone('')
          return
        })
      setMsgText('Number Changed')
      setIsMsgTxtSuccess(true)
      setTimeout(() => {
        setMsgText('')
      }, 5000)
      setNewName('')
      setNewPhone('')
    } else {
      const newPerson = {
        name: newName,
        number: newPhone,
      }

      createNew(newPerson).then(data => setPersons([...persons, data]))

      setMsgText(`Added ${newName}`)
      setIsMsgTxtSuccess(true)
      setTimeout(() => {
        setMsgText('')
      }, 5000)
      setNewName('')
      setNewPhone('')
    }
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

  useEffect(() => {
    getAll().then(data => setPersons(data))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorMsg message={msgText} success={isMsgTxtSuccess} />
      <Filter search={search} setSearch={setSearch} />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
      />
      <Persons handleDelete={handleDelete} shown={shown} />
    </div>
  )
}

export default App
