import express from 'express';  
import { getAllUsers,createUser } from '../controllers/user.controller.js';

const router = express.Router();

// Example user routes
router.get('/', getAllUsers);

export default router;