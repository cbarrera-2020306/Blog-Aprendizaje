import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostList from '../components/posts/PostList'
import { getAllPosts } from '../services/postService'

const PostPage = () => {
  const { curso } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getAllPosts().then(data => {
      setPosts(data.filter(post => post.curso === curso))
    })
  }, [curso])

  return (
    <div className="container mt-4" style={{ backgroundColor: '#00ffb9', minHeight: '100vh', padding: '2rem' }}>
      <h1>Posts de {curso}</h1>
      <PostList posts={posts} />
    </div>
  )
}

export default PostPage
