import User from "../models/user.model.js" ;
import mongoose from "mongoose" ;
import errorAuth from '../utils/errorAuth.util.js';

// generate JWT token and send client as the response :
export const sendToken = (user, statusCode, res)=>{
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true, 
        token
    })
}

//  Registration Controller : 
export const registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body ;

        if (!username || !email || !password) {
            return next(new errorAuth("Please fill all fields", 400));
        }
        
        const existingUser = await User.findOne({ email })
        // if user already exist then throw an error
        if(existingUser){
            return next(new errorAuth("User already exists!!!", 500)) 
        }
        const newUser = await User.create({username, email, password})
        sendToken(newUser, 200, res) ; 
    } catch (error) {
        console.log(error.message)
        next(error) 
    }
}

// Login Controller :
export const loginController = async (req, res, next) => {
    try {
        // removed username 
        const { email , password } = req.body ;
        if(!email || !password){
            return next(new errorAuth("Please provide with email and password", 400))
        }
        const user = await User.findOne({email})
        if(!user){
            return next(new errorAuth("Invalid Credentials: Create user.", 401)) 
        }
        const isMatch = await user.matchPassword(password) 
        if(!isMatch){
            return next(new errorAuth("Invalid Credentials.", 401)) 
        }
        sendToken(user, 200, res) ; // login is succesfull!! 
    } catch (error) {
        console.log(error.message)
        next(error) 
    }
}

export const logoutController = async (req, res, next) => {
    res.clearCookie("refreshToken") 
    return res.status(200).json({ success: true, message: "Logged Out Successfully..."})
}