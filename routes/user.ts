import { Router } from 'express';
import { register } from '../controllers'
import { authorize } from '../middlewares';

export const userRouter = Router();

userRouter.post('/register', register);

// export default userRouter;