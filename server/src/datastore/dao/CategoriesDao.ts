import { Category } from '../../types/typeDao';

export interface CategoryDao {
  createCategory(category: Category): Promise<void>;
  getCategoryById(id: string): Promise<Category | undefined>;
  getCategoryByName(name: string): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  updateCategory(category: Category): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
