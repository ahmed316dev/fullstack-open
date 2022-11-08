import React from 'react'

const Person = ({ name, number, id, handleDelete }) => {
  return (
    <div key={name}>
      <table>
        <tbody>
          <tr>
            <td> {name}: </td>
            <td>{number}</td>
            <td>
              <button onClick={() => handleDelete(id)}>x</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Person
