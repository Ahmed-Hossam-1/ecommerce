import { db } from '../datastore';
import {
  createCategoryRequest,
  createCategoryResponse,
  getAllCategoriesRequest,
  getAllCategoriesResponse,
  updateCategoryRequest,
  updateCategoryResponse,
} from '../types/api';
import { Category, ExpressHandler, ExpressHandlerWithParams } from '../types/typeDao';
import crypto from 'crypto';

export const createCategory: ExpressHandler<createCategoryRequest, createCategoryResponse> = async (
  req,
  res
) => {
  const { categoryName, categoryDescription } = req.body;
  if (!categoryName || !categoryDescription) {
    return res.status(400).json({ message: 'Invalid request' });
  }
  // category exists
  if (await db.getCategoryByName(categoryName)) {
    return res.status(400).json({ message: 'Category already exists' });
  }

  const newCategory: Category = {
    categoryId: crypto.randomUUID(),
    categoryName,
    categoryDescription,
  };

  await db.createCategory(newCategory);
  res.status(201).json({ message: 'Category created successfully' });
};

export const updateCategory: ExpressHandlerWithParams<
  { categoryId: string },
  updateCategoryRequest,
  updateCategoryResponse
> = async (req, res) => {
  const { categoryId } = req.params;
  const { categoryName, categoryDescription } = req.body;
  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is required' });
  }
  if (!categoryName || !categoryDescription) {
    return res.status(400).json({ message: 'Invalid request' });
  }
  const category = await db.getCategoryById(categoryId);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  await db.updateCategory({ categoryId, categoryName, categoryDescription });
  res.status(200).json({ message: 'Category updated successfully' });
};

export const deleteCategory: ExpressHandlerWithParams<{ categoryId: string }, {}, {}> = async (
  req,
  res
) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is required' });
  }
  const category = await db.getCategoryById(categoryId);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  await db.deleteCategory(categoryId);
  res.status(200).json({ message: 'Category deleted successfully' });
};

export const getAllCategories: ExpressHandler<
  getAllCategoriesRequest,
  getAllCategoriesResponse
> = async (_, res) => {
  const categories = await db.getAllCategories();
  res.status(200).json({ categories });
};

export const getCategoryById: ExpressHandlerWithParams<
  { categoryId: string },
  {},
  { category: Category }
> = async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is required' });
  }
  const category = await db.getCategoryById(categoryId);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.status(200).json({ category });
};
