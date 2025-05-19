import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPostComments, addComment } from '../../services/postService'
import api from '../../services/api'

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
        console.log('Respuesta posts:', res.data)
        const postsArray = Array.isArray(res.data.data) ? res.data.data : []
        console.log('Array posts:', postsArray)
        console.log('postId param:', postId)
        const found = postsArray.find(p => String(p._id) === String(postId))
        console.log('Post encontrado:', found)

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
        console.log('Comentarios:', commentsData)
        setComments(Array.isArray(commentsData) ? commentsData : [])
      })
      .catch(err => {
        console.error('Error fetching comments:', err)
      })
  }, [postId])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await addComment({ ...newComment, post: postId })
      const updatedComments = await getPostComments(postId)
      setComments(updatedComments)
      setNewComment({ author: '', content: '' })
    } catch (err) {
      alert('Error al agregar comentario')
    }
  }

  if (loading) return <p>Cargando post...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!post) return <p>No se encontró el post.</p>

  return (
    <div>
      <h2>{post.title}</h2>
      <p><strong>Curso:</strong> {post.curso}</p>
      <p>{post.description}</p>

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

      <h3>Comentarios</h3>
      {comments.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        <ul>
          {comments.map(c => (
            <li key={c._id}><strong>{c.author}:</strong> {c.content}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PostDetail
