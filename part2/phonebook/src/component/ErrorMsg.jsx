import React from 'react'

const ErrorMsg = ({ message, success }) => {
  const errorClassName = success ? 'successMessage' : 'errorMessage'
  if (!message) return null
  return <div className={errorClassName}>{message}</div>
}

export default ErrorMsg
