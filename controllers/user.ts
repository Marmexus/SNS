import UserModel from '../models';
import { Request, Response } from 'express';
import { registerValidator } from '../middlewares';
import bcrypt from 'bcrypt';

function passwordEncrypt(password: string) {
    const salt: number = 10;
    return bcrypt.hash(password, salt);
}

export async function register(req: Request, res: Response): Promise<any> {
    const { username, name, email, password } = req.body;

    const validated = registerValidator.validate(req.body);
    if (validated.error) {
        return res.status(400).json(validated.error.details[0].message);
    }

    const existedUser = await UserModel.find({ username });
    if (existedUser.length > 0) {
        return res.status(400).json('User existed');
    }

    const passwordEncrypted: string = await passwordEncrypt(password);

    const user = new UserModel({
        username,
        name,
        email,
        password: passwordEncrypted
    })

    await user.save();
    return res.status(201).json(user);
}