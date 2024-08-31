import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUserByID,
  updateUser,
} from '../controller/user.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const userRouter = express.Router();

userRouter.route('/currentuser').get(authMiddleware, getCurrentUser);
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:userId').put(updateUser).delete(deleteUser).get(getUserByID);
