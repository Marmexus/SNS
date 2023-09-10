import Joi from 'joi';

export const registerValidator = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(16).required(),
    avatar: Joi.string().uri(),
});

export const updateProfileValidator = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    name: Joi.string(),
    email: Joi.string().email(),
    avatar: Joi.string().uri(),
});