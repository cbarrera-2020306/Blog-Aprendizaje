import Comment from './comment.model.js'
import Post from '../post/post.model.js'

// Agregar Comentario (sin usuario autenticado)
export const addCommentary = async (req, res) => {
    try {
        const data = req.body

        // Verificar que el post exista
        const post = await Post.findById(data.post)
        if (!post) {
            return res.status(404).send({ success: false, message: 'Post not found' })
        }

        // Crear nuevo comentario con el autor proporcionado en el body
        const comment = new Comment({
            author: data.author,
            content: data.content,
            post: data.post
        })

        await comment.save()

        return res.send({ success: true, message: 'Comment added successfully', data: comment })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'General error saving the comment', error })
    }
}

// Eliminar Comentario (sin validar autor, porque no hay login)
export const deleteCommentary = async (req, res) => {
    try {
        const { id } = req.params

        const comment = await Comment.findById(id)
        if (!comment) {
            return res.status(404).send({ success: false, message: 'Commentary not found' })
        }

        await Comment.findByIdAndDelete(id)

        return res.send({ success: true, message: 'Commentary deleted successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'General error deleting commentary', error })
    }
}

// Obtener comentarios de una publicación específica (más recientes primero)
export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).send({ success: false, message: 'Post not found' })
        }

        const comments = await Comment.find({ post: postId })
            .sort({ createdAt: -1 }) // Más recientes primero
            .exec()

        return res.send({ success: true, data: comments })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'General error getting comments', error })
    }
}

