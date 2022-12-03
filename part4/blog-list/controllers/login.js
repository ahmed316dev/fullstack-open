import { Router } from 'express'
import JWT from 'jsonwebtoken'
import { User } from '../models/user.js'
import { SECRET } from '../utils/config.js'
import bcrypt from 'bcrypt'
const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const [user] = await User.find({ username: username })

  if (!user) {
    return res.status(401).send('no such user')
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordCorrect) {
    return res.status(401).send('password is incorrect')
  }

  const token = JWT.sign({ name: user.name, username }, SECRET)

  return res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      username,
      blogs: user.blogs,
      JWT: token,
    },
  })
})

export default loginRouter
