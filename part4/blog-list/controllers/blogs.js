import { Router } from 'express'
import { Blog } from '../models/blog.js'
import { info } from '../utils/logger.js'

const blogsRouter = Router()

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

export default blogsRouter
