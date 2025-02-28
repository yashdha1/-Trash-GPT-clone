import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; 

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true,"Please enter A UserName."], 
        unique: true
    },
    email : {
        type: String,
        required: [true,"Please enter an email"], 
        unique: true
    },
    password : {
        type: String,
        required: true, 
        minlength: [6, "Password must be at least 6 characters long"] 
    }, 
    subscription : {
        type: String,
        default: "" 
    }
})

// use normal functions js does not support arrow functions... 
// before saving the model doing password hashing 
// during saving the password, hash the password then save it 
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// matching the password in the database with the password entered by the user
// creating a method for the user model to match password with the entered password 
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password); 
}

// SIGN TOKENS - create JWT Tokens for the user. 
userSchema.methods.getSignedToken = function(res){
    const accessToken = jwt.sign({id: this._id}, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIREIN }); 
    const refreshToken = jwt.sign({id: this._id}, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIREIN }); 
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 86400 * 1000,
    }); 
    return accessToken;
}


// ship model as a user... 
const User = mongoose.model("User", userSchema) ;
export default User ;