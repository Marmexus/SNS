import { Router } from 'express';
import { createPost } from '../controllers'
import { authorize } from '../middlewares';

export const userRouter = Router();

userRouter.post('/post', authorize, createPost);