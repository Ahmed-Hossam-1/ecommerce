import express from 'express';
import { createUser, deleteUser, getAllUsers, updateUser } from '../controller/user.controller';

export const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:userId').put(updateUser).delete(deleteUser);
