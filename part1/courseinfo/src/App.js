import { useState } from 'react'
import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'
debugger
const App = () => {
  const [counter, setCounter] = useState(0)
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ],
  }
  return (
    <div>
      {counter}
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
