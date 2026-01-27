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
 * POST /api/user/update/:id
 */
export const updateUser = async (req, res, next) => {
  try {
    if (!req.user || req.user.userId !== req.params.id) {
      return res.status(401).json({
        message: 'You can update only your account',
      });
    }

    const updateData = {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
    };

    if (req.body.password) {
      updateData.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

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
  try {
    // allow only owner
    if (!req.user || req.user.userId !== req.params.id) {
      return res.status(401).json({
        message: 'You can delete only your account',
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);

    // 🔥 clear JWT after deletion
    res
      .clearCookie('clientToken', {
        httpOnly: true,
        sameSite: 'lax',
      })
      .status(200)
      .json({ message: 'Account deleted successfully' });

  } catch (error) {
    next(error);
  }
};

 