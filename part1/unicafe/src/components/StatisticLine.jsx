import React from 'react'

const StatisticLine = ({ text, value, isPercentage = false }) => {
  return (
    <>
      <td>{text}</td>
      <td>
        {value} {isPercentage && '%'}
      </td>
    </>
  )
}

export default StatisticLine
