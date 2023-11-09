import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

const signUp = async (req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save();
        res.status(200).json({
            message: "Sign up user"
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
    
};

export {
    signUp,
}