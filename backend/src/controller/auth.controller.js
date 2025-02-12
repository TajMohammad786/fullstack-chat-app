import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWTToken } from "../lib/generateJWTToken.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, username, password: hashedPassword });

        if (newUser) {
            generateJWTToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid User Data" });
        }
    } catch (error) {
        console.log("error in auth signup ", error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid Password" });
        }

        generateJWTToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            message: "Logged In successfully",
        });
    } catch (error) {
        console.log("Error in auth controller", error.message);
        res.status(500).json({ message: error.message });
    }
};
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Invalid Profile Picture" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true },
        );

        res.status(200).json({
            message: "Profile Picture Updated Successfully",
            updatedUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json({
            message: "User is Authenticated",
            User: req.user,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
