import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(express.static('build'))

// make use of the cors middleware
app.use(cors())

const PORT = process.env.PORT || 3001

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

// a separate function to generate new unique ids
const generateId = () => {
  return Math.floor(Math.random() * 1000000000)
}

// make use of a parser middleware
app.use(express.json())

// make use of morgan middelware to log HTTP requests
morgan.token('reqBody', (req, res) => JSON.stringify(req.body))

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.reqBody(req, res),
    ].join(' ')
  })
)

// display all persons in phonebook
app.get('/api/persons', (req, res) => {
  return res.json(phonebook)
})

// display info for phonebook
app.get('/info', (req, res) => {
  return res.send(
    `<div>Phonebook has info for ${
      phonebook.length
    } persons</div><br/><div>${Date()}</div>`
  )
})

// display a single person
app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params
  const person = phonebook.find(person => person.id === Number(id))
  console.log('person', person)
  if (person) {
    return res.json(person)
  }
  return res.status(404).send('No person with matching id')
})

// delete a single resource
app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params
  const personExists = phonebook.find(person => person.id === Number(id))
    ? true
    : false

  if (personExists) {
    phonebook = phonebook.filter(person => person.id !== Number(id))
    return res.status(204).end()
  }

  return res
    .status(404)
    .send("<div>The person you are trying to delete doesn't exist</div>")
})

// create a new person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  if (phonebook.find(person => person.name === name)) {
    return res.status(400).send('This person already exists')
  } else if (!(name && number)) {
    return res.status(400).send('you have to provide name AND number')
  }
  const newId = generateId()
  phonebook = phonebook.concat({ id: newId, name, number })
  const newPerson = phonebook.find(person => person.id === newId)
  return res.status(201).json(newPerson)
})

app.listen(PORT, () => console.log('server running on port', PORT))
