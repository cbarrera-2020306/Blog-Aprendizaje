import api from './api'

export const getAllPosts = async () => {
  const res = await api.get('/v1/post/posts')
  console.log('Respuesta del backend:', res.data)

  const posts = Array.isArray(res.data) ? res.data : []

  if (!posts.length) {
    throw new Error('No se encontraron posts.')
  }

  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}


export const getPostComments = async (postId) => {
  const res = await api.get(`/v1/Commentary/commentsPost/${postId}`)
  return res.data
}

export const addComment = async (comment) => {
  await api.post('/v1/Commentary/addCommentary', comment)
}
