import {Router} from 'express';
import { addPost, updatePost, deletePost, getAllPost } from '../post/post.controller.js';
const api = Router();

//Rutas
api.get('/posts', getAllPost)
api.post('/addPost',  addPost);
api.put('/updatePost/:id',  updatePost);
api.delete('/deletePost/:id', deletePost);

export default api;