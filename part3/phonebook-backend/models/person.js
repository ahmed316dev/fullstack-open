import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI

// regex for validating phone number
const regexValidateNumber = /^\d{8,}$|^\d{2}-\d{6,}$|^\d{3}-\d{5,}$/
// custom validator
const validateNumber = [
  val => {
    return regexValidateNumber.test(val)
  },
  'Not a valid number',
]

console.log('connecting to MongoDB')
mongoose
  .connect(uri)
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch(err => console.log('error connecting to MongoDB:', err))

// create shcema for person
const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: { type: String, validate: validateNumber },
})
personSchema.set('toJSON', {
  transform: (document, reutrnedObj) => {
    reutrnedObj.id = reutrnedObj._id.toString()
    delete reutrnedObj._id
    delete reutrnedObj.__v
  },
})

export const Person = mongoose.model('Person', personSchema)
