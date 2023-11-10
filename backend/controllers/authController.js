import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
// import { errorHandler } from '../utils/error.js';

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

export {
    signUp,
}