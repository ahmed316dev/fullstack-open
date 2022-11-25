import JWT from 'jsonwebtoken'
import { User } from '../models/user.js'
import { SECRET } from './config.js'

export const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    request.token = token
  }
  next()
}

export const userExtractor = async (request, response, next) => {
  if (request.token) {
    const userFromToken = JWT.verify(request.token, SECRET)

    const [user] = await User.find({ username: userFromToken.username })

    request.user = user
  }
  next()
}

export const errorHandler = (error, request, response, next) => {
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).send('Invalid token')
  }
  if (error.name === 'CastError') {
    return response.status(404).send('invalid blog id')
  }
  next(error)
}
