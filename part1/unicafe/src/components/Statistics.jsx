import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({ good, bad, neutral, score }) => {
  if (good || bad || neutral || score) {
    return (
      <div>
        <h3>statistics</h3>
        <table>
          <tbody>
            <tr>
              <StatisticLine text="good" value={good} />
            </tr>
            <tr>
              <StatisticLine text="neutral" value={neutral} />
            </tr>
            <tr>
              <StatisticLine text="bad" value={bad} />
            </tr>
            <tr>
              <StatisticLine text="all" value={bad + good + neutral} />
            </tr>
            <tr>
              <StatisticLine
                text="average"
                value={score / (bad + good + neutral)}
              />
            </tr>
            <tr>
              <StatisticLine
                text="positive"
                value={(good / (bad + good + neutral)) * 100}
                isPercentage={true}
              />
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h3>statistics</h3>
        <p>No feedback given</p>
      </div>
    )
  }
}

export default Statistics
