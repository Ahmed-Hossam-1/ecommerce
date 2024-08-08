import express from 'express';
import { getAllUsers } from '../controller/user.controller';

export const userRouter = express.Router();

userRouter.get('/users', getAllUsers);
