import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

const test = (req, res) => {
    res.json({
        message: "API route working!"
    });
};

const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        next(errorHandler(401, "You can update only your own account"));
        return;
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
        }, {new: true});

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        next(errorHandler(401,"You can delete only your account!"));
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json("User has been deleted!");
    } catch (error) {
        next(error);
    }
    
};

export {
    test,
    updateUser,
    deleteUser,
}