import { Router } from 'express'
import { Blog } from '../models/blog.js'
import 'express-async-errors'

const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'did not provide title or url' })
  }
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const deleteRes = await Blog.findByIdAndRemove(id)
  if (!deleteRes) return response.status(400).send('malformed request')
  response.status(204).send('Blog Deleted')
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const blog = request.body

  const updateRes = await Blog.findByIdAndUpdate({ _id: id }, blog, {
    runValidators: true,
    returnDocument: 'after',
  })
  const successfulyUpdatedRes = await updateRes.save()
  response.status(200).json(successfulyUpdatedRes)
})

export default blogsRouter
