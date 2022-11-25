import app from '../app'
import supertest from 'supertest'
import mongoose from 'mongoose'
import { Blog } from '../models/blog'
import {
  blogsInDb,
  blogsInRoute,
  initialBlogs,
  initialUser,
} from './test_helper.js'
import { User } from '../models/user'
import JWT from 'jsonwebtoken'
import { SECRET } from '../utils/config'

export const api = supertest(app)

let userJWT

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = new User(await initialUser())
  await user.save()

  userJWT = JWT.sign({ name: user.name, username: user.username }, SECRET)

  for (let blog of initialBlogs) {
    blog.user = user._id
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json with initialBlogs length', async () => {
  const { body } = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)

  expect(body).toHaveLength(initialBlogs.length)
}, 100000)

test('the unique identifier is named "id"', async () => {
  const { body } = await blogsInRoute()
  expect(body[0].id).toBeDefined()
})

test('the first blog is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')
  const authors = response.body.map(r => r.author)
  expect(authors).toContain('Joel Olawanle')
})

test('a valid blog can be added', async () => {
  const blogsInDbABefore = await blogsInDb()
  const newBlog = {
    title: 'Difference between forEach() and map()',
    author: 'Priyanka Mohanty',
    url: 'https://medium.com/@sdepriyanka/difference-between-foreach-and-map-b335a29cace2',
    likes: 48,
  }

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${userJWT}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const addedBlogProcessed = addedBlog.body
  const blogsInDbAfter = await blogsInDb()
  delete addedBlogProcessed.user
  blogsInDbAfter.forEach(blog => delete blog.user)
  expect(blogsInDbAfter).toHaveLength(blogsInDbABefore.length + 1)
  expect(blogsInDbAfter).toContainEqual(addedBlogProcessed)
})

test('likes default to 0 when not provided', async () => {
  const newBlog = {
    title: 'Difference between forEach() and map()',
    author: 'Priyanka Mohanty',
    url: 'https://medium.com/@sdepriyanka/difference-between-foreach-and-map-b335a29cace2',
  }

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${userJWT}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const addedBlogProcessed = JSON.parse(addedBlog.res.text)
  expect(addedBlogProcessed.likes).toBe(0)
})

test('get 400 if title or url are unprovided', async () => {
  const newBlog = {
    author: 'Priyanka Mohanty',
    url: 'https://medium.com/@sdepriyanka/difference-between-foreach-and-map-b335a29cace2',
    likes: 11,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('blog is successfully deleted', async () => {
  const blogsInDbABefore = await blogsInDb()
  const deletedId = blogsInDbABefore[0].id

  await api
    .delete(`/api/blogs/${deletedId}`)
    .set('Authorization', `Bearer ${userJWT}`)
    .expect(204)

  const blogsInDbAfter = await blogsInDb()
  expect(blogsInDbAfter).toHaveLength(blogsInDbABefore.length - 1)
})

test('blog is successfuly updated', async () => {
  const blogs = await blogsInDb()
  const blog = {
    ...blogs[0],
    author: 'John Doe',
    user: blogs[0].user.toString(),
  }
  const id = blog.id
  // deleting id because it's not supposed to be updated/changed
  delete blog.id
  const { body: updatedBlog } = await api
    .put(`/api/blogs/${id}`)
    .send(blog)
    .set('Authorization', `Bearer ${userJWT}`)
    .expect(200)

  // deleting id for the sake of comparision
  delete updatedBlog.id

  expect(updatedBlog).toEqual(blog)
})

afterAll(() => {
  mongoose.connection.close()
})
