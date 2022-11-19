const findMostAuthor = authors => {
  // I will need two counters
  let maxCount = 0
  let count = 0
  // I will need one var to store the highest element in freq
  let mostFrequentAuthor = authors[0]
  // I will need two loops
  for (let i = 0; i < authors.length; i++) {
    count = 0
    for (let j = 0; j < i; j++) {
      if (authors[i] === authors[j]) {
        count++
      }
    }
    // if current is higher than prev then update maxCount and maxAuthor
    if (count > maxCount) {
      maxCount = count
      mostFrequentAuthor = authors[i]
    }
  }
  return mostFrequentAuthor
}

export const getAllAuthors = blogs => blogs.map(blog => blog.author)

export const dummy = () => 1

export const listHelper = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

export const favoriteBlog = blogs => {
  return blogs.reduce((prev, current) => {
    if (current.likes > prev.likes) return current
    else return prev
  })
}

export const mostBlogs = blogs => {
  const allAuthors = getAllAuthors(blogs)
  const mostAuthor = findMostAuthor(allAuthors)
  const mostAuthorBlogCount = blogs.filter(
    blog => blog.author === mostAuthor
  ).length
  return { author: mostAuthor, blogs: mostAuthorBlogCount }
}
export const mostLikes = blogs => {
  const allAuthors = {}
  getAllAuthors(blogs).forEach(author => (allAuthors[author] = 0))

  blogs.forEach(blog => {
    allAuthors[blog.author] += blog.likes
  })
  const mostLikedAuthor = { author: '', likes: 0 }
  const mostLikedAuthorArr = Object.entries(allAuthors).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )
  mostLikedAuthor.author = mostLikedAuthorArr[0]
  mostLikedAuthor.likes = mostLikedAuthorArr[1]

  return mostLikedAuthor
}
