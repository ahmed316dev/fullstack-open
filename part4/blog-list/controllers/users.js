import 'express-async-errors'
import { Router } from 'express'
import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from '../utils/config.js'

const usersRouter = Router()
// a route for creating users
usersRouter.post('/', async (request, response) => {
  // hash password

  const { name, username, password: plaintextPassword } = request.body

  if (!(name && username && plaintextPassword)) {
    return response
      .status(401)
      .send('name, username or password were NOT provided')
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(plaintextPassword, saltRounds)

  const user = { name, username, passwordHash }
  const newUser = await new User(user)
  await newUser.save()

  // generate a JWT token for the {name, username}
  const userForToken = { name, username }
  const token = jwt.sign(userForToken, SECRET)
})

export default usersRouter
