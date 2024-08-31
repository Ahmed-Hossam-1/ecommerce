import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  updateProduct,
} from '../controller/product.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadFields } from '../utils/uploadImagesProduct';

export const productRouter = Router();

productRouter.route('/').post(authMiddleware, uploadFields, createProduct).get(getAllProducts);
productRouter
  .route('/:productId')
  .put(authMiddleware, updateProduct as any)
  .delete(deleteProduct)
  .get(getProductById);
productRouter.route('/search').post(searchProducts);
productRouter.route('/products/:productByCategoryId').get(getProductsByCategory);
