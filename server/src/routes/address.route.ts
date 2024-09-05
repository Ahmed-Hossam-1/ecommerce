import express from 'express';
import {
  createAddress,
  editAddress,
  getAddressByUserId,
  // getSingleAddress,
} from '../controller/address.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const addressRouter = express.Router();

addressRouter.route('/create').post(authMiddleware, createAddress);
addressRouter.route('/').get(authMiddleware, getAddressByUserId);
addressRouter.route('/:id').put(authMiddleware, editAddress as any);
