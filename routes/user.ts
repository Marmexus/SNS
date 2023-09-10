import { Router } from 'express';
import { register, login } from '../controllers'
import { authorize } from '../middlewares';

export const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

// export default userRouter;