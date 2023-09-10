import { Router } from 'express';
import { createPost } from '../controllers'
import { authorize } from '../middlewares';

export const postRouter = Router();

postRouter.post('/post', authorize, createPost);