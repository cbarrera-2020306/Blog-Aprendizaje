import Post from './post.model.js'
import Comment from '../comment/comment.model.js'

// Agregar Post
export const addPost = async (req, res) => {
    try {
        const data = req.body

        const post = new Post({
            title: data.title,
            description: data.description,
            curso: data.curso
        })

        await post.save()

        return res.send({ success: true, message: 'Post added successfully', data: post })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'General error saving Post', error })
    }
}

// Eliminar Post y sus comentarios relacionados
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).send({ success: false, message: 'Post not found' })
        }

        // Eliminar comentarios relacionados
        await Comment.deleteMany({ post: id })

        // Eliminar el post
        await Post.findByIdAndDelete(id)

        return res.send({ success: true, message: 'Post and associated comments deleted successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'General error deleting post', error })
    }
}

// Obtener todos los posts ordenados por fechas
// Obtener todos los posts ordenados por fechas
export const getAllPost = async (req, res) => {
  try {
    const orderQuery = req.query.order
    const order = orderQuery === 'asc' ? 1 : -1

    const posts = await Post.find().sort({ createdAt: order })

    if (posts.length === 0) {
      return res.status(404).json([])
    }

    return res.json(posts)  // 🔥 Aquí devolvemos solo el array
  } catch (error) {
    console.error(error)
    return res.status(500).json([])
  }
}

// Actualizar Post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const newData = req.body

        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).send({ success: false, message: 'Post not found' })
        }

        const updatedPost = await Post.findByIdAndUpdate(id, newData, { new: true })

        return res.send({ success: true, message: 'Post updated successfully', data: updatedPost })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'General error updating post', error })
    }
}
