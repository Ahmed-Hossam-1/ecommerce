import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySeller,
  getTopRatedProducts,
  getTopSellingProducts,
  searchProducts,
  updateProduct,
} from '../controller/product.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadFields } from '../utils/uploadImagesProduct';

export const productRouter = Router();
productRouter.route('/create').post(authMiddleware, uploadFields, createProduct);
productRouter.route('/all').get(getAllProducts);
productRouter.route('/get-by-sellerId').get(authMiddleware, getProductsBySeller);
productRouter.route('/top-product/top-selling').get(getTopSellingProducts);
productRouter.route('/top-product/top-rated').get(getTopRatedProducts);
productRouter.route('/single/:productId').get(getProductById);
productRouter.route('/products/:productByCategoryId').get(getProductsByCategory);

productRouter
  .route('/:productId')
  .put(authMiddleware, updateProduct as any)
  .delete(deleteProduct);

productRouter.route('/search').post(searchProducts);
