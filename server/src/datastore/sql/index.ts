import sqlite3 from 'sqlite3';
import { DataStore } from '..';
import { Database, open } from 'sqlite';
import { User } from '../../types/typeDao';
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

  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO USER (id,email,password,name,role) VALUES (?,?,?,?)',
      user.id,
      user.email,
      user.password,
      user.name,
      user.role
    );
  }

  getAllUser(): Promise<User> {
    return this.db.all('SELECT * FROM USER');
  }

  deleteUser(__: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getUserByEmail(__: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  getUserById(__: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  updateUser(__: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
