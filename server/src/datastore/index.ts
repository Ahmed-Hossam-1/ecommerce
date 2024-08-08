import { UserDao } from './dao/UserDao';
import { SqlDataStore } from './sql';

export interface DataStore extends UserDao {}

export let db: DataStore;

export async function initDB() {
  db = await new SqlDataStore().openDb();
}
