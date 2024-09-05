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
import { allowedTo } from '../middleware/allowedTo';

export const productRouter = Router();
productRouter
  .route('/create')
  .post(authMiddleware, allowedTo(['admin', 'seller']), uploadFields, createProduct);
productRouter
  .route('/:productId')
  .put(authMiddleware, allowedTo(['admin', 'seller']), updateProduct as any)
  .delete(authMiddleware, allowedTo(['admin', 'seller']), deleteProduct as any);

productRouter.route('/all').get(getAllProducts);
productRouter.route('/get-by-sellerId').get(authMiddleware, getProductsBySeller);
productRouter.route('/top-product/top-selling').get(getTopSellingProducts);
productRouter.route('/top-product/top-rated').get(getTopRatedProducts);
productRouter.route('/single/:productId').get(getProductById);
productRouter.route('/products/:productByCategoryId').get(getProductsByCategory);
productRouter.route('/search').post(searchProducts);
