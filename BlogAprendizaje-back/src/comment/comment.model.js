import { Schema, model } from 'mongoose'

const commentSchema = new Schema(
  {
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      maxLength: [500, 'Comment cannot exceed 500 characters'],
      trim: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post reference is required']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false // 👈 Esto también elimina __v aquí
  }
)

export default model('Comment', commentSchema)
