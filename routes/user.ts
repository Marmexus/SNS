import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers'
import { authorize } from '../middlewares';

export const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/:username', authorize, getProfile);
userRouter.post('/update/:username', authorize, updateProfile);

// export default userRouter;