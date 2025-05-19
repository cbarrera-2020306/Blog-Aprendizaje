import { useNavigate } from 'react-router-dom'

export const PostCard = ({ post }) => {
  const navigate = useNavigate()

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card" style={{ backgroundColor: '#00e0c6' }}>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text"><strong>Curso:</strong> {post.curso}</p>
          <p className="card-text">{post.description}</p>
          <button className="btn btn-primary" onClick={() => navigate(`/post/${post._id}`)}>
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard
