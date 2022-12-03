import 'express-async-errors'
import { Router } from 'express'
import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from '../utils/config.js'

const usersRouter = Router()
// a route for creating users
usersRouter.post('/', async (request, response) => {
  const { name, username, password: plaintextPassword } = request.body

  if (!(username && plaintextPassword)) {
    return response
      .status(401)
      .json({ error: 'username or password were NOT provided' })
  } else if (!(username.length >= 3 && plaintextPassword.length >= 3)) {
    return response.status(401).json({
      error: 'username and password must be at least 3 characters long',
    })
  }

  // hash password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(plaintextPassword, saltRounds)

  const user = { name, username, passwordHash }
  const newUser = await new User(user)

  await newUser.save()

  // generate a JWT token for the {name, username}
  const userForToken = { name, username }
  const token = jwt.sign(userForToken, SECRET)
  return response.status(201).json({ JWT: token })
})

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs', { user: 0 })

  const allUsersProcessed = allUsers.map(user => {
    return {
      name: user.name,
      username: user.username,
      id: user._id,
      blogs: user.blogs,
    }
  })
  response.json(allUsersProcessed)
})

export default usersRouter
