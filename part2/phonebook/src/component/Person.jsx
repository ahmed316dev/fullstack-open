import React from 'react'

const Person = ({ name, phone }) => {
  return (
    <div key={name}>
      <table>
        <tbody>
          <tr>
            <td> {name}: </td> <td>{phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Person
