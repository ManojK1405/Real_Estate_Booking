import express from 'express';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';



const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;


