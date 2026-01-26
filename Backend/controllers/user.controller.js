import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

/**
 * GET ALL USERS (optional / admin use)
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * CREATE USER (usually handled in auth.controller)
 */
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const { password: pass, ...rest } = newUser._doc;
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE USER
 * PUT /api/user/update/:id
 */
export const updateUser = async (req, res, next) => {
  // user can update only their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account'));
  }

  try {
    const updateData = {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar, // Cloudinary URL
    };

    // hash password only if provided
    if (req.body.password) {
      updateData.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE USER
 * DELETE /api/user/delete/:id
 */
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account'));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
