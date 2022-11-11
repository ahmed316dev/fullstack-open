import express, { response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { Person } from './models/person.js'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())

app.use(express.static('build'))

// make use of the cors middleware
app.use(cors())

const PORT = process.env.PORT || 3001

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
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(people => {
      return res.json(people)
    })

    .catch(err => next(err))
})

// display info for phonebook
app.get('/info', (req, res) => {
  Person.count().then(length => {
    return res.send(
      `<div>Phonebook has info for ${length} persons</div><br/><div>${Date()}</div>`
    )
  })
})

// display a single person
app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findById(id)
    .then(person => {
      const { name, number, _id } = person
      const id = _id.toString()
      res.json({ name, number, id }).end()
    })
    .catch(error => next(error))
})

// delete a single resource
app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndRemove(id)
    .then(result => {
      return res.status(204).end()
    })
    .catch(error => next(error))

  // return res
  //   .status(404)
  //   .send("<div>The person you are trying to delete doesn't exist</div>")
})

// update a person
app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const person = req.body
  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then(({ name, number, _id }) => {
      const id = _id.toString()
      res.json({ name, number, id })
    })
    .catch(err => next(err))
})

// create a new person
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  Person.find({ name }).then(result => {
    if (result.length > 0) {
      return res.status(400).send('name already exsits')
    } else if (!(name && number)) {
      res.status(400).send('you have to provide name AND number').end()
    } else {
      const person = new Person({ name, number })
      person
        .save()
        .then(({ name, number, _id }) => {
          const id = _id.toString()
          res.json({ name, number, id })
        })
        .catch(err => next(err))
    }
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

app.listen(PORT, () => console.log('server running on port', PORT))

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error })
  } else {
    return res.status(404).send({ error }).end()
  }
  next(error)
}
app.use(errorHandler)
