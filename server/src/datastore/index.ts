import { CategoryDao } from './dao/CategoriesDao';
import { ProductDao } from './dao/ProductDao';
import { SellerReqDao } from './dao/SellerReqDao';
import { UserDao } from './dao/UserDao';
import { SqlDataStore } from './sql';

export interface DataStore extends UserDao, SellerReqDao, CategoryDao, ProductDao {}

export let db: DataStore;

export async function initDB() {
  db = await new SqlDataStore().openDb();
}
