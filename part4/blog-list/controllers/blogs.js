import { Router } from 'express'
import { Blog } from '../models/blog.js'
import 'express-async-errors'
import { User } from '../models/user.js'
import JWT from 'jsonwebtoken'
import { SECRET } from '../utils/config.js'

const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    passwordHash: 0,
    blogs: 0,
  })
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'did not provide title or url' })
  }

  const authorUser = request.user
  blog.user = authorUser._id
  authorUser.blogs.push(blog._id)
  await authorUser.save()

  const result = await blog.save()
  return response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const userId = request.user._id.toString()

  const blogToDelete = await Blog.findById(id)
  const blogCreatorId = blogToDelete.user.toString()

  if (userId !== blogCreatorId) {
    return response.status(401).send('user is unauthorized')
  }

  const deleteRes = await Blog.findByIdAndRemove(id)
  if (!deleteRes) return response.status(400).send('malformed request')
  response.status(204).send('Blog Deleted')
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const blog = request.body
  const user = request.user

  const blogCreator = await Blog.findById(id)
  const blogCreatorId = blogCreator.user.toString()
  const userId = user._id.toString()

  if (!userId === blogCreatorId) {
    return response.status(401).send('user unauthorized')
  }

  const updateRes = await Blog.findByIdAndUpdate(id, blog, {
    runValidators: true,
    returnDocument: 'after',
  })
  const successfulyUpdatedRes = await updateRes.save()
  response.status(200).json(successfulyUpdatedRes)
})

export default blogsRouter
