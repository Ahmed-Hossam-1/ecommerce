import { Router } from 'express';
import { createPayment } from '../controller/payment.controller';
export const paymentRouter = Router();

paymentRouter.route('/create').post(createPayment);
