import { useNavigate } from 'react-router-dom'

export const PostCard = ({ post }) => {
  const navigate = useNavigate()

  return (
    <div className="post-card" onClick={() => navigate(`/post/${post._id}`)}>
      <h2>{post.title}</h2>
      <p><strong>Curso:</strong> {post.curso}</p>
      <p>{post.description}</p>
    </div>
  )
}
export default PostCard