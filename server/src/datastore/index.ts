import { SellerReqDao } from './dao/SellerReqDao';
import { UserDao } from './dao/UserDao';
import { SqlDataStore } from './sql';

export interface DataStore extends UserDao, SellerReqDao {}

export let db: DataStore;

export async function initDB() {
  db = await new SqlDataStore().openDb();
}
