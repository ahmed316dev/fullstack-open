import React, { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [current, setCurrent] = useState(0)
  const [anecdote, setAnecdote] = useState(anecdotes[0])
  const [mostVoted, setMostVoted] = useState(null)

  const generateAnecdote = () => {
    const randomNum = Math.floor(Math.random() * (anecdotes.length - 1))
    setCurrent(randomNum)
    setAnecdote(anecdotes[randomNum])
  }
  const handleVote = index => {
    const copy = [...votes]
    copy[index]++
    setVotes(copy)
  }
  useEffect(() => {
    setMostVoted(votes.indexOf(Math.max.apply(Math, votes)))
  }, [votes])

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdote}
      <br />
      has {votes[current]} votes
      <br />
      <button onClick={() => handleVote(current)}>vote</button>
      <button onClick={generateAnecdote}>next anecdote</button>
      <br />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}
      <br />
      has {votes[mostVoted]} votes
    </div>
  )
}
export default App
