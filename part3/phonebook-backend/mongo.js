import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('provide a password')
  process.exit(1)
}

// credentials
const password = process.argv[2]
const uri = `mongodb+srv://influ316:${password}@fullstackopen.vjrks5t.mongodb.net/?retryWrites=true&w=majority`

// create shcema for person
const personSchema = new mongoose.Schema({ name: String, number: String })
const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(uri)
  .then(res => {
    if (process.argv.length === 3) {
      // retirieve all documents and print them out
      Person.find({})
        .then(res => {
          res.forEach(person => {
            console.log(person)
          })
        })
        .then(res => {
          return mongoose.connection.close()
        })
    }

    // add a new entry
    if (process.argv.length > 3) {
      const personName = process.argv[3]
      const personNumber = process.argv[4]
      const person = new Person({ name: personName, number: personNumber })

      console.log('Person saved')
      return person.save().then(res => {
        return mongoose.connection.close()
      })
    }
  })
  .catch(err => console.log(err))
