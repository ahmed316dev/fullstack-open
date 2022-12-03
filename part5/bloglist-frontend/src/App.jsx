import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import NotificationMsg from './components/NotificationMsg'
import Toggleable from './components/Toggleable'
import UserLogin from './components/UserLogin'
import { getAll } from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMsg, setNotificationMsg] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const handleBlogSubmit = async (blogAuthor, blogTitle, blogUrl) => {
    blogFormRef.current.toggleVisibilty()
    const blog = { title: blogTitle, author: blogAuthor, url: blogUrl }
    const config = { headers: { Authorization: `Bearer ${user.JWT}` } }
    const { data } = await axios.post('api/blogs', blog, config)
    setBlogs([...blogs, data])

    setNotificationMsg(`Blog "${data.title}" by ${data.author} was added`)
    setTimeout(() => {
      setNotificationMsg('')
    }, 5000)
  }

  const handleLogin = async (username, password) => {
    try {
      loginFormRef.current.toggleVisibilty()
      const response = await axios.post('/api/login', { username, password })
      setUser(response.data.user)

      setNotificationMsg('login successful!')
      setTimeout(() => {
        setNotificationMsg('')
      }, 5000)
    } catch (error) {
      setNotificationMsg(error.response.data)
      setTimeout(() => {
        setNotificationMsg('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setNotificationMsg('logout successful')
    setTimeout(() => {
      setNotificationMsg('')
    }, 5000)
  }

  useEffect(() => {
    if (localStorage.getItem('user') === undefined) {
      localStorage.setItem('user', null)
    }
  }, [])

  useEffect(() => {
    getAll().then(blogs => setBlogs(blogs))

    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <div>
      {notificationMsg && <NotificationMsg notificationMsg={notificationMsg} />}
      {!user && (
        <Toggleable label="login" ref={loginFormRef}>
          <h2>Login to application</h2>
          <UserLogin user={user} handleLogin={handleLogin} />
        </Toggleable>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button>
            <input
              type="submit"
              value="logout"
              onClick={() => handleLogout()}
            />
          </button>
          {
            <Toggleable label="create" ref={blogFormRef}>
              <BlogForm handleBlogSubmit={handleBlogSubmit} />
            </Toggleable>
          }
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
