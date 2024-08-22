import sqlite3 from 'sqlite3';
import { DataStore } from '..';
import { Database, open } from 'sqlite';
import { SellerReq, User } from '../../types/typeDao';
import path from 'path';

export class SqlDataStore implements DataStore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    this.db = await open({
      filename: path.join(__dirname, 'ecommerce.sqlite'),
      driver: sqlite3.Database,
    });

    this.db.run('PRAGMA foreign_keys = ON;');

    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }

  async addSellerRequest(seller: SellerReq): Promise<void> {
    await this.db.run(
      'INSERT INTO SELLER_REQUEST (id,userId,name,email,password,status) VALUES (?,?,?,?,?,?)',
      seller.requestId,
      seller.userId,
      seller.name,
      seller.email,
      seller.password,
      seller.status
    );
  }

  getAllSellerRequests(): Promise<SellerReq[]> {
    return this.db.all('SELECT id,userId,name,email,status FROM SELLER_REQUEST');
  }

  getSellerRequestById(id: string): Promise<SellerReq | undefined> {
    return this.db.get('SELECT * FROM SELLER_REQUEST WHERE id=?', id);
  }

  async updateSellerRequestStatus(id: string, status: string): Promise<void> {
    await this.db.run('UPDATE SELLER_REQUEST SET status=? WHERE id=?', status, id);
  }

  getSellerByEmail(email: string): Promise<SellerReq | undefined> {
    return this.db.get('SELECT * FROM SELLER_REQUEST WHERE email=?', email);
  }

  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO USER (id,email,password,name,role) VALUES (?,?,?,?,?)',
      user.id,
      user.email,
      user.password,
      user.name,
      user.role
    );
  }

  getAllUser(): Promise<User[]> {
    return this.db.all('SELECT id,name,email,role FROM USER');
  }

  getUserById(id: string): Promise<User | undefined> {
    return this.db.get('SELECT * FROM USER where id=?', id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.db.run('DELETE FROM USER WHERE id=?', id);
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get('SELECT * FROM USER WHERE email=?', email);
  }

  async updateUser(user: User): Promise<void> {
    await this.db.run(
      'UPDATE USER SET name=?,email=?,role=? WHERE id=?',
      user.name,
      user.email,
      user.role,
      user.id
    );
  }
}
