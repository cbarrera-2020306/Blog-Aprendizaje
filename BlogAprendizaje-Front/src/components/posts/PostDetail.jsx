import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPostComments, addComment } from '../../services/postService'
import api from '../../services/api'
import './PostDetail.css'

const PostDetail = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ author: '', content: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    api.get('/v1/post/posts')
      .then(res => {
        const postsArray = Array.isArray(res.data) ? res.data : []
        const found = postsArray.find(p => String(p._id) === postId)
        if (!found) {
          setError('No se encontró el post.')
          setPost(null)
        } else {
          setPost(found)
        }
      })
      .catch(err => {
        console.error('Error fetching posts:', err)
        setError('Error al cargar post.')
      })
      .finally(() => setLoading(false))

    getPostComments(postId)
      .then(commentsData => {
        setComments(Array.isArray(commentsData.data) ? commentsData.data : [])
      })
      .catch(err => {
        console.error('Error fetching comments:', err)
      })
  }, [postId])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const commentToAdd = { ...newComment, post: postId }
      await addComment(commentToAdd)

      const updatedComments = await getPostComments(postId)
      setComments(Array.isArray(updatedComments.data) ? updatedComments.data : [])

      setNewComment({ author: '', content: '' })
    } catch (err) {
      alert('Error al agregar comentario')
    }
  }

  if (loading) return <p className="loading">Cargando post...</p>
  if (error) return <p className="error">{error}</p>
  if (!post) return <p className="error">No se encontró el post.</p>

  return (
    <div className="post-detail-container">
      <div className="left-section">
        <div className="post-box">
          <div className="post-header">
            <h2 className="post-title">{post.title}</h2>
            <span className="post-date">
              {new Date(post.createdAt).toLocaleString('es-ES', {
                dateStyle: 'short',
                timeStyle: 'short'
              })}
            </span>
          </div>
          <p className="post-curso"><strong>Curso:</strong> {post.curso}</p>
          <p className="post-description">{post.description}</p>
        </div>

        <div className="form-box">
          <h3>Agregar Comentario</h3>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Autor"
              value={newComment.author}
              onChange={e => setNewComment({ ...newComment, author: e.target.value })}
              required
            />
            <textarea
              placeholder="Comentario"
              value={newComment.content}
              onChange={e => setNewComment({ ...newComment, content: e.target.value })}
              required
            />
            <button type="submit">Comentar</button>
          </form>
        </div>
      </div>

      <div className="right-section">
        <div className="comments-box">
          <h3>Comentarios</h3>
          {comments.length === 0 ? (
            <p>No hay comentarios aún.</p>
          ) : (
            <ul className="comment-list">
              {comments.map(c => (
                <li key={c._id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">{c.author}</span>
                    <span className="comment-date">
                      {new Date(c.createdAt).toLocaleString('es-ES', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                      })}
                    </span>
                  </div>
                  <div className="comment-content">{c.content}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostDetail
