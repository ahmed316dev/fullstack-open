import React from 'react'

const Total = ({ exercises }) => {
  const { exercises1, exercises2, exercises3 } = exercises
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
}

export default Total
