import { Router } from 'express';
import { register, login, profile } from '../controllers'
import { authorize } from '../middlewares';

export const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/:username', authorize, profile);

// export default userRouter;