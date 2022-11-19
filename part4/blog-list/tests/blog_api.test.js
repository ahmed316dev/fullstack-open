import app from '../app'
import supertest from 'supertest'
import mongoose from 'mongoose'
import { Blog } from '../models/blog'
import { blogsInDb, blogsInRoute, initialBlogs } from './test_helper.js'

export const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of initialBlogs) {
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
  const newBlog = {
    title: 'Difference between forEach() and map()',
    author: 'Priyanka Mohanty',
    url: 'https://medium.com/@sdepriyanka/difference-between-foreach-and-map-b335a29cace2',
    likes: 48,
  }

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const addedBlogProcessed = JSON.parse(addedBlog.res.text)
  const response = await blogsInDb()
  expect(response).toHaveLength(initialBlogs.length + 1)
  expect(response).toContainEqual(addedBlogProcessed)
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
  const { body: allBlogs } = await blogsInRoute()
  const deletedId = allBlogs[0].id
  await api.delete(`/api/blogs/${deletedId}`).expect(204)
})

test('blog is successfuly updated', async () => {
  const { body: allBlogs } = await blogsInRoute()
  const blog = { ...allBlogs[0], author: 'John Doe' }
  const id = blog.id

  // deleting id because it's not supposed to be updated/changed
  delete blog.id
  const { body: updatedBlog } = await api
    .put(`/api/blogs/${id}`)
    .send(blog)
    .expect(200)

  // deleting id for the sake of comparision
  delete updatedBlog.id
  expect(updatedBlog).toEqual(blog)
})

afterAll(() => {
  mongoose.connection.close()
})
