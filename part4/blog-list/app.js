import express from 'express'
import cors from 'cors'
import blogsRouter from './controllers/blogs.js'
import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/config.js'
const app = express()

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

export default app
