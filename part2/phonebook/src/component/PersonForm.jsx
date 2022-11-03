import React from 'react'

const PersonForm = ({
  handleSubmit,
  newName,
  setNewName,
  newPhone,
  setNewPhone,
}) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            type="name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </div>
        <div>
          phone:{' '}
          <input
            type="tel"
            value={newPhone}
            onChange={e => setNewPhone(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
