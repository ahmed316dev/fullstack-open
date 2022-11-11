import mongoose from 'mongoose'

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('provide a password')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

// credentials
// eslint-disable-next-line no-undef
const password = process.argv[2]
const uri = `mongodb+srv://influ316:${password}@fullstackopen.vjrks5t.mongodb.net/?retryWrites=true&w=majority`

// create shcema for person
const personSchema = new mongoose.Schema({ name: String, number: String })
const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(uri)
  .then(() => {
    // eslint-disable-next-line no-undef
    if (process.argv.length === 3) {
      // retirieve all documents and print them out
      Person.find({})
        .then(res => {
          res.forEach(person => {
            console.log(person)
          })
        })
        .then(() => {
          return mongoose.connection.close()
        })
    }

    // add a new entry
    // eslint-disable-next-line no-undef
    if (process.argv.length > 3) {
      // eslint-disable-next-line no-undef
      const personName = process.argv[3]
      // eslint-disable-next-line no-undef
      const personNumber = process.argv[4]
      const person = new Person({ name: personName, number: personNumber })

      console.log('Person saved')
      return person.save().then(() => {
        return mongoose.connection.close()
      })
    }
  })
  .catch(err => console.log(err))
