import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

//Register a user: /api/user/register
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({
                success: false,
                message: "Please fill all the fields",
            })
        }
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.json({
                success: false,
                message: "User already exists",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('token', token, {
            httpOnly: true, //Prevent js to access cookie 
            secure: process.env.NODE_ENV === 'production', //Use Secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF Protection
            maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie Expiration time - 7 days
        })

        return res.json({
            success: true,
            message: "User Registered Successfully",
            user:{
                name: user.name,
                email: user.email
            },
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//Login a user: /api/user/login
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({
                success: false,
                message: "Email and Password are required",
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success: false, 
                message: "User not Found!",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({
                success: false, 
                message: "Invalid Credentials",
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({
            success: true,
            message: "User Logged In Successfully",
            user:{
                name: user.name,
                email: user.email
            },
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        })
    
    }
}

//Check auth - /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        
        return res.json({
            success: true,
            user
        })

    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//Logout a user: /api/user/logout
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({
            success: true,
            message: "Logged Out Successfully",
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        })
    }
}