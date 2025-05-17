import { Schema, model } from 'mongoose';

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [100, 'Title cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Description for activity is required']
        },
        curso: {
            type: String,
            enum: ['TALLER', 'TECNOLOGIA', 'PRACTICA-SUPERVISADA'],
            required: [true, 'curso is required']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

export default model('Post', postSchema);
