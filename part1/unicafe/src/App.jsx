import React, { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore] = useState(0)

  const handleBad = () => {
    setBad(bad + 1)
    setScore(score - 1)
  }

  const handleGood = () => {
    setGood(good + 1)
    setScore(score + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <>
      <div>
        <h3>give feedback</h3>
        <Button feedback="good" setFeedback={handleGood} />
        <Button feedback="neutral" setFeedback={handleNeutral} />
        <Button feedback="bad" setFeedback={handleBad} />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} score={score} />
    </>
  )
}

export default App
