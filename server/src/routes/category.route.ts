import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controller/categories.controller';
import { allowedTo } from '../middleware/allowedTo';
import { authMiddleware } from '../middleware/authMiddleware';

export const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .post(authMiddleware, allowedTo(['admin']), createCategory)
  .get(getAllCategories);
categoryRouter
  .route('/:categoryId')
  .delete(authMiddleware, allowedTo(['admin']), deleteCategory as any)
  .put(authMiddleware, allowedTo(['admin']), updateCategory as any)
  .get(getCategoryById);
