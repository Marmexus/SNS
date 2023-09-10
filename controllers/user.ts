import UserModel from '../models';
import { Request, Response } from 'express';
import { registerValidator } from '../middlewares';

export async function register(req: Request, res: Response): Promise<any> {
    const { username, name, email, password } = req.body;

    const validated = registerValidator.validate(req.body);
    if (validated.error) {
        return res.status(400).json(validated.error.details[0].message);
    }

    const existedUser = await UserModel.find({username});
    if (existedUser.length > 0){
        return res.status(400).json('User existed');
    }

    const user = new UserModel({
        username,
        name,
        email,
        password
    })

    // await user.save();
    return res.status(201).json(user);
}