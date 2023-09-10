import Joi from 'joi';

export const registerValidator = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(16).required(),
    avatar: Joi.string().uri(),
});

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).max(16).required(),
});

export const registerInputValidate = (username: string, name: string, email: string, password: string, avatar?: string) => {
    try {
        const validated = registerValidator.validate({
            username: username,
            name: name,
            email: email,
            password: password,
            avatar: avatar,
        });
        return validated;
    } catch (err) {
        console.log(err);
    }
}

// export default registerInputValidate