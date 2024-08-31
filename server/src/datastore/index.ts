import { AddressDao } from './dao/AddressDao';
import { CategoryDao } from './dao/CategoriesDao';
import { OrderDao, OrderItemDao } from './dao/OrderDao';
import { ProductDao } from './dao/ProductDao';
import { SellerReqDao } from './dao/SellerReqDao';
import { UserDao } from './dao/UserDao';
import { SqlDataStore } from './sql';

export interface DataStore
  extends UserDao,
    SellerReqDao,
    CategoryDao,
    ProductDao,
    AddressDao,
    OrderDao,
    OrderItemDao {}

export let db: DataStore;

export async function initDB() {
  db = await new SqlDataStore().openDb();
}
