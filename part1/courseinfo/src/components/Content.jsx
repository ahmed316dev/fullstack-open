import React from 'react'
import Part from './Part'
const Content = ({ parts, exercises }) => {
  const { part1, part2, part3 } = parts
  const { exercises1, exercises2, exercises3 } = exercises
  return (
    <>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </>
  )
}

export default Content
