import { Router } from 'express';
import { createOrder, getOrder } from '../controller/order.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const orderRouter = Router();

orderRouter.route('/create').post(authMiddleware, createOrder);
orderRouter.route('/get-order').get(authMiddleware, getOrder);
