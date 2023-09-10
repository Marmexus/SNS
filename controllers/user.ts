import UserModel from '../models';
import { Request, Response } from 'express';
import { registerValidator, createToken } from '../middlewares';
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

    try {
        const existedUsername = await UserModel.find({ username });
        const existedEmail = await UserModel.find({ email });
        if (existedUsername.length > 0 || existedEmail.length > 0) {
            if (existedUsername.length > 0) {
                return res.status(400).json('User existed');
            } else {
                return res.status(400).json('Email existed');
            }
        }

        const passwordEncrypted: string = await passwordEncrypt(password);

        const user = new UserModel({
            username,
            name,
            email,
            password: passwordEncrypted
        })

        await user.save();

        const token = await createToken(user.username, user.email);

        return res.status(201).json({ jwt: token, data: user });
    } catch (err) {
        console.log(err);
    }
}

export async function login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    const existedUser = await UserModel.find({ email });
    if (existedUser.length === 0) {
        return res.status(400).json('Invalid email or password');
    }

    const user = existedUser[0];
    const isMatch: boolean = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(400).json('Invalid email or password');
    }

    const token = await createToken(user.username, user.email);

    return res.status(200).json({ jwt: token, data: user });
}