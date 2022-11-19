import express from 'express'
import cors from 'cors'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/config.js'
const app = express()
import 'express-async-errors'

mongoose.connect(MONGODB_URI)

app.use(express.json())
app.use(cors())
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

export default app
