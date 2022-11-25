import mongoose, { Schema } from 'mongoose'

const userSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  blogs: { type: [mongoose.Schema.ObjectId], ref: 'Blog' },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const User = mongoose.model('User', userSchema)
