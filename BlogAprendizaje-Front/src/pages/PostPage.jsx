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
    <div>
      <h1>Posts de {curso}</h1>
      <PostList posts={posts} />
    </div>
  )
}

export default PostPage
