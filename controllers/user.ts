import UserModel from '../models';
import { Request, Response } from 'express';

export async function register(req: Request, res: Response): Promise<any> {
    const { username, name, email, password } = req.body;

    const user = new UserModel({
        username,
        name,
        email,
        password
    })

    await user.save();
    return res.status(201).json(user);
}