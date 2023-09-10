import { UserFollowerModel, UserFollowingModel, UserModel } from '../models';
import { Request, Response } from 'express';
import { registerValidator, createToken, updateProfileValidator } from '../middlewares';

export async function followUser(req: Request, res: Response) {
    const auth = req.user;
    const { username } = req.params;

    try {
        const currentUser = await UserModel.findOne({ username: auth.username });
        const userToFollow = await UserModel.findOne({ username: username });
        if (!userToFollow) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const updateFollowing = new UserFollowingModel({
            userId: currentUser?._id,
            followingId: userToFollow._id
        });

        await updateFollowing.save();

        const updateFollower = new UserFollowerModel({
            userId: userToFollow._id,
            followerId: currentUser?._id
        });

        await updateFollower.save();
        return res.status(200).json({
            message: 'User followed',
        });
    } catch (err) {
        console.log(err);
    }
}