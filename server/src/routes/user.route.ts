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
import { allowedTo } from '../middleware/allowedTo';

export const userRouter = express.Router();

userRouter.route('/currentuser').get(authMiddleware, getCurrentUser);
userRouter
  .route('/')
  .get(getAllUsers)
  .post(authMiddleware, allowedTo(['admin']), createUser);
userRouter
  .route('/:userId')
  .put(authMiddleware, allowedTo(['admin']), updateUser as any)
  .delete(authMiddleware, allowedTo(['admin']), deleteUser as any)
  .get(getUserByID);
