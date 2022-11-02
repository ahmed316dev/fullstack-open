import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((prev, current) => {
    return prev + current.exercises
  }, 0)
  return <p>total of {total} exercises</p>
}

export default Total
