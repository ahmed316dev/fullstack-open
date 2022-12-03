import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  const blogStyles = {
    border: '1px #000 solid',
    padding: '10px',
    margin: '15px',
  }

  const propertyStyles = {
    fontWeight: 'bold',
  }
  return (
    <div style={blogStyles}>
      {blog.title} by {blog.author}{' '}
      <button onClick={() => setView(!view)}>{view ? 'hide' : 'show'}</button>
      {view && (
        <>
          <br />
          <span style={propertyStyles}>Link: </span>
          {blog.url}
          <br />
          <span style={propertyStyles}>Likes: </span> {blog.likes}{' '}
          <button>Like</button>
          <br />
          <span style={propertyStyles}>added by: </span>
          {blog.user.name}
        </>
      )}
    </div>
  )
}

export default Blog
