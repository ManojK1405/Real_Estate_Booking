import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

export const signup = async (req, res,next) => {
    const {username, password, email} = req.body;
    if(!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    };

    try {
        const existingUser = await User.findOne({ $or: [ { username }, { email } ] });
        if(existingUser) {
            return res.status(409).json({ 
                success:false,
                message: 'Username or Email already exists' });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ 
            success:true,
            message: 'User registered successfully' 
        });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res,next) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res.status(400).json({ message: 'Username and Password are required' });
    };

    try {
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ 
                success:false,
                message: 'Invalid Username or Password' });
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ 
                success:false,
                message: 'Invalid Username or Password' });
        };

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );      
        const {password: _, ...userData} = user._doc; // Exclude password from user data
        res.status(200).cookie("clientToken", token, {
            httpOnly: true,
            samesite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).json({
            success: true,
            message: "Signin successful",
            user: userData
        });
    } catch (error) {
        next(error);
    }
};



