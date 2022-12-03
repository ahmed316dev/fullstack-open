import express from 'express'
import cors from 'cors'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/config.js'
const app = express()
import 'express-async-errors'
import {
  errorHandler,
  tokenExtractor,
  userExtractor,
} from './utils/middleware.js'
import loginRouter from './controllers/login.js'

mongoose.connect(MONGODB_URI)

app.use(express.json())
app.use(cors())
app.use(tokenExtractor)
app.use('/api/users', usersRouter)
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

export default app
