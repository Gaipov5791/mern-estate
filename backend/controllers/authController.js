import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save();
        res.status(200).json({
            message: "Sign up successfully!"
        });
    } catch (error) {
        next(error);
    }
};

const signIn = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(401, "User Not Found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(404, "Wrong Credentials"));
        const token = jwt.sign({id: validUser._id}, process.env.SECRET_JWT);
        const {password: pass, ...rest} = validUser._doc;
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest)
    } catch (error) {
        next(error);
    }
};

export {
    signUp,
    signIn,
}