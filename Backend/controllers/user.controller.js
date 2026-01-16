import express from 'express';  

export const getAllUsers = (req, res) => {
    res.json({'message':'Get all users'});
};

export const createUser = (req, res) => {
    res.json({'message':'Create a user'});
};