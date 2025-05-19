import { useEffect, useState } from 'react'
import PostList from '../components/posts/PostList'
import { getAllPosts } from '../services/postService'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts()
        setPosts(fetchedPosts)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Hubo un problema al cargar los posts.')
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="container mt-4">
      <h2>Todos los Posts</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  )
}

export default Home
