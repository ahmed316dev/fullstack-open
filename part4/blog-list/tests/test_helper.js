import { Blog } from '../models/blog'
import { api } from './blog_api.test'

export const initialBlogs = [
  {
    _id: '636f3da3a26828243fa41b17',
    title:
      'How to Fix TypeError: Cannot read Property push of Undefined in JavaScript',
    author: 'Joel Olawanle',
    url: 'https://www.freecodecamp.org/news/fix-typeerror-cannot-read-property-push-of-undefined-in-javascript/',
    likes: 22,
    __v: 0,
  },
  {
    _id: '636f3de7a26828243fa41b1a',
    title:
      'How to Fix TypeError: Cannot read Property push of Undefined in JavaScript',
    author: 'Joel Olawanle',
    url: 'https://www.freecodecamp.org/news/fix-typeerror-cannot-read-property-push-of-undefined-in-javascript/',
    likes: 22,
    __v: 0,
  },
  {
    _id: '637344132c47c93500183957',
    title:
      'How to Fix TypeError: Cannot read Property push of Undefined in JavaScript',
    author: 'Joel Olawanle',
    url: 'https://www.freecodecamp.org/news/fix-typeerror-cannot-read-property-push-of-undefined-in-javascript/',
    likes: 22,
    __v: 0,
  },
]

export const findBlog = async id => {
  return await Blog.findById(id)
}

export const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

export const nonExistingId = async () => {
  const newBlog = new Blog({
    title:
      'How to Fix TypeError: Cannot read Property push of Undefined in JavaSc…',
    author: 'Joel Olawanle',
    url: 'https://www.freecodecamp.org/news/fix-typeerror-cannot-read-property-p…',
    likes: 22,
  })

  await newBlog.save()
  await newBlog.remove()
  return newBlog._id.toString()
}

export const blogsInRoute = async () => await api.get('/api/blogs')
