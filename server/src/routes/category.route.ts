import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controller/categories.controller';

export const categoryRouter = express.Router();

categoryRouter.route('/').post(createCategory).get(getAllCategories);
categoryRouter
  .route('/:categoryId')
  .delete(deleteCategory)
  .put(updateCategory)
  .get(getCategoryById);
