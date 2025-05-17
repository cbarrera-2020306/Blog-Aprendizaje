//Validar campos en las rutas
import {body} from 'express-validator'; //Captura todo el body de la solicitud
import {validateErrorWithoutImg} from './validate.error.js'

export const addPostValidator = [
    body('title', 'Title is required').notEmpty().isLength({max : 100}),
    body('category', 'Category is required').notEmpty(),
    body('content', 'Content is required').notEmpty(),
    validateErrorWithoutImg
];

export const updatePostValidator = [
    body('title', 'Title is required').optional().notEmpty().isLength({max : 100}),
    body('category', 'Category is required').optional().notEmpty(),
    body('content', 'Content is required').optional().notEmpty(),
    validateErrorWithoutImg
];

export const addCommentaryValidator = [
    body('content', 'Content is required').notEmpty().isLength({max : 500}),
    body('post', 'Post is required').notEmpty(),
    validateErrorWithoutImg
];

export const updateCommentaryValidator = [
    body('content', 'Content is required').optional().notEmpty().isLength({max : 500}),
    body('post', 'Post is required').optional().notEmpty(),
    validateErrorWithoutImg
];