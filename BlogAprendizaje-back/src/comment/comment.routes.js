import {Router} from 'express';
import {addCommentary, deleteCommentary, getCommentsByPost} from './comment.controller.js';

const api = Router();

//Rutas
api.post('/addCommentary', addCommentary);
api.get('/commentsPost/:postId', getCommentsByPost);
api.delete('/deleteCommentary/:id', deleteCommentary);

export default api;