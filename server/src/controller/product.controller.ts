import { db } from '../datastore';
import { createProductRequest, createProductResponse, updateProductRequest } from '../types/api';
import { ExpressHandler, ExpressHandlerWithParams, Product } from '../types/typeDao';
import crypto from 'crypto';

export const createProduct: ExpressHandler<createProductRequest, createProductResponse> = async (
  req,
  res
) => {
  const { name, description, price, quantity, categoryId } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const mainImage = files?.['mainImage']?.[0]?.path;
  const images = files?.['images']?.map(file => file.path);

  if (!name || !description || !price || !quantity || !categoryId) {
    return res.status(400).json({ error: 'Bad Request', message: 'All fields are required' });
  }

  const sellerId = res.locals.userId;
  if (!sellerId) {
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'You are not authorized to create a product' });
  }

  const product = {
    id: crypto.randomUUID(),
    name,
    description,
    price,
    quantity,
    mainImage,
    images,
    categoryId,
    sellerId,
  };

  await db.createProduct(product);
  res.status(201).json({ product });
};

export const getAllProducts: ExpressHandler<{}, { products: Product[] }> = async (_, res) => {
  const products = await db.getProducts();
  res.json({ products });
};

export const updateProduct: ExpressHandlerWithParams<
  { productId: string },
  updateProductRequest,
  { updatedProduct: Product }
> = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, quantity, categoryId } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Bad Request', message: 'Product ID is required' });
  }
  if (!name || !description || !price || !quantity || !categoryId) {
    return res.status(400).json({ error: 'Bad Request', message: 'All fields are required' });
  }

  const sellerId = res.locals.userId;
  if (!sellerId) {
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'You are not authorized to create a product' });
  }

  const existingProduct = await db.getProductById(productId);
  if (!existingProduct) {
    return res.status(404).json({ error: 'Not Found', message: 'Product not found' });
  }

  const updatedProduct = {
    id: productId,
    name,
    description,
    price,
    quantity,
    categoryId,
    sellerId,
  };
  await db.updateProduct(updatedProduct);
  res.status(201).json({ updatedProduct });
};

export const deleteProduct: ExpressHandlerWithParams<{ productId: string }, {}, {}> = async (
  req,
  res
) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ error: 'Bad Request', message: 'Product ID is required' });
  }
  const exist = await db.getProductById(productId);
  if (!exist) {
    return res.status(404).json({ error: 'Not Found', message: 'Product not found' });
  }
  await db.deleteProduct(productId);
  res.status(200).json({ message: 'Product deleted' });
};

export const getProductById: ExpressHandlerWithParams<
  { productId: string },
  {},
  { product: Product }
> = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ error: 'Bad Request', message: 'Product ID is required' });
  }
  const product = await db.getProductById(productId);
  if (!product) {
    return res.status(404).json({ error: 'Not Found', message: 'Product not found' });
  }
  res.json({ product });
};

export const searchProducts: ExpressHandler<
  { searchTerm: string; categoryId: string },
  { products: Product[] }
> = async (req, res) => {
  const { searchTerm, categoryId } = req.query;
  console.log({ searchTerm, categoryId });

  if (!searchTerm || !categoryId) {
    return res
      .status(400)
      .json({ error: 'Bad Request', message: 'Search term and category ID are required' });
  }

  const products = await db.searchProducts(searchTerm, categoryId);
  res.json({ products });
};

export const getProductsByCategory: ExpressHandlerWithParams<
  { productByCategoryId: string },
  {},
  { products: Product[] }
> = async (req, res) => {
  const { productByCategoryId } = req.params;
  if (!productByCategoryId) {
    return res.status(400).json({ error: 'Bad Request', message: 'Category ID is required' });
  }
  const products = await db.getProductsByCategory(productByCategoryId);
  if (!products) {
    return res.status(404).json({ error: 'Not Found', message: 'Products not found' });
  }
  res.json({ products });
};
