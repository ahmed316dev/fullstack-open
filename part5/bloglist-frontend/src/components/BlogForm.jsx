import React, { useState } from 'react'

const BlogForm = ({ handleBlogSubmit }) => {
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  return (
    <div>
      <p>title</p>
      <input
        type="text"
        value={blogTitle}
        onChange={e => setBlogTitle(e.target.value)}
      />
      <p>author</p>
      <input
        type="text"
        value={blogAuthor}
        onChange={e => setBlogAuthor(e.target.value)}
      />
      <p>url</p>
      <input
        type="text"
        value={blogUrl}
        onChange={e => setBlogUrl(e.target.value)}
      />
      <input
        type="submit"
        value="create"
        onClick={() => {
          handleBlogSubmit(blogAuthor, blogTitle, blogUrl)
          setBlogAuthor('')
          setBlogTitle('')
          setBlogUrl('')
        }}
      />
    </div>
  )
}

export default BlogForm
