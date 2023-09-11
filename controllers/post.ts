import { UserModel, PostModel, ImageModel } from '../models';
import { Request, Response } from 'express';
import { postValidator } from '../middlewares';

export async function createPost(req: Request, res: Response): Promise<any> {
    const auth = req.user;
    const { title, content, image } = req.body;

    const validated = postValidator.validate({ title, content });
    if (validated.error) {
        return res.status(400).json(validated.error.details[0].message);
    }

    try {
        const user = await UserModel.findOne({ username: auth.username });
        if (!user) {
            return res.status(404).json('Something went wrong');
        }

        let imageUploaded;
        if (image) {
            const imageUpload = new ImageModel({
                image: image
            })
            imageUploaded = await imageUpload.save();
        }

        const post = new PostModel({
            userId: user._id,
            title: title,
            content: content,
            imageId: imageUploaded !== undefined ? imageUploaded._id : null
        })

        await post.save();
        return res.status(201).json(post);
    } catch (err) {
        console.log(err);
    }
}