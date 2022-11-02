import React from 'react'

const Button = ({ feedback, setFeedback }) => {
  return (
    <div>
      <button onClick={setFeedback}>{feedback}</button>
    </div>
  )
}

export default Button
