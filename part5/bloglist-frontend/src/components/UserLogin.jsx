import React, { useState } from 'react'

const UserLogin = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <p>username</p>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <p>password</p>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button>
        <input
          type="submit"
          value="login"
          onClick={() => {
            handleLogin(username, password)
            setUsername('')
            setPassword('')
          }}
        />
      </button>
    </div>
  )
}

export default UserLogin
