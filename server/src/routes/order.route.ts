import { Router } from 'express';
import { createOrder } from '../controller/order.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const orderRouter = Router();

orderRouter.route('/create').post(authMiddleware, createOrder);
