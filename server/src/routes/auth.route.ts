import express from 'express';
import { signIn, signupController } from '../controller/auth.controller';

export const authRouter = express.Router();

authRouter.route('/signup').post(signupController);
authRouter.route('/signin').post(signIn);
