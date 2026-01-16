import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const login = async (req, res) => {
    const {username,password} = req.body;   
    if(!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    };
    const user = await User.findOne({ username });
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    };
    jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            return res.status(500).json({ message: 'Error generating token' });
        }
        res.status(200).json({ 
            success:true,
            message: 'Login successful',
            token 
        });
    }); 
}



