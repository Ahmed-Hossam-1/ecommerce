import { Product } from '../../types/typeDao';

export interface ProductDao {
  createProduct: (product: Product) => Promise<void>;
  getProducts: () => Promise<Product[]>;
  getProductById: (productId: string) => Promise<Product | undefined>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  // getProductsByCategory: (categoryId: string) => Promise<Product[]>;
  // getProductsBySeller: (sellerId: string) => Promise<Product[]>;
  // searchProducts: (searchTerm: string) => Promise<Product[]>;
  // getProductsByCategoryAndSeller: (categoryId: string, sellerId: string) => Promise<Product[]>;
}
