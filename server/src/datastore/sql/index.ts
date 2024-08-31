import sqlite3 from 'sqlite3';
import { DataStore } from '..';
import { Database, open } from 'sqlite';
import { Address, Category, Product, SellerReq, User } from '../../types/typeDao';
import path from 'path';
import { Order, OrderItem } from '../dao/OrderDao';

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

  // Order
  async createOrder(order: Order): Promise<void> {
    await this.db.run(
      'INSERT INTO ORDERS (id,userId,totalAmount) VALUES (?,?,?)',
      order.id,
      order.userId,
      order.totalAmount
    );
  }

  getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.db.all('SELECT * FROM ORDERS WHERE userId=?', userId);
  }

  async createOrderItem(orderItem: OrderItem): Promise<void> {
    await this.db.run(
      'INSERT INTO ORDER_ITEMS (id,orderId,productId,quantity,price) VALUES (?,?,?,?,?)',
      orderItem.id,
      orderItem.orderId,
      orderItem.productId,
      orderItem.quantity,
      orderItem.price
    );
  }

  // Address
  async createAddress(address: Address): Promise<void> {
    await this.db.run(
      'INSERT INTO ADDRESS (id,userId,street,city,state,country,phone) VALUES (?,?,?,?,?,?,?)',
      address.id,
      address.userId,
      address.street,
      address.city,
      address.state,
      address.country,
      address.phone
    );
  }

  getAddressById(id: string): Promise<Address | undefined> {
    return this.db.get('SELECT * FROM ADDRESS WHERE id=?', id);
  }

  getAddressByUserId(userId: string): Promise<Address | undefined> {
    return this.db.get('SELECT * FROM ADDRESS WHERE userId=?', userId);
  }

  async editAddress(address: Address): Promise<void> {
    await this.db.run(
      'UPDATE ADDRESS SET street=?,city=?,state=?,country=?,phone=? WHERE id=?',
      address.street,
      address.city,
      address.state,
      address.country,
      address.phone,
      address.id
    );
  }

  // Product
  async createProduct(product: Product): Promise<void> {
    await this.db.run(
      'INSERT INTO PRODUCTS (id,name,description,price,quantity,mainImage,images,categoryId,sellerId) VALUES (?,?,?,?,?,?,?,?,?)',
      product.id,
      product.name,
      product.description,
      product.price,
      product.quantity,
      product.mainImage,
      product.images?.join(','),
      product.categoryId,
      product.sellerId
    );
  }

  async getProducts(): Promise<Product[]> {
    return this.db.all('SELECT * FROM PRODUCTS');
  }

  getProductById(id: string): Promise<Product | undefined> {
    return this.db.get('SELECT * FROM PRODUCTS WHERE id=?', id);
  }

  async updateProduct(product: Product): Promise<void> {
    await this.db.run(
      'UPDATE PRODUCTS SET name=?,description=?,price=?,quantity=?,categoryId=?,sellerId=? WHERE id=?',
      product.name,
      product.description,
      product.price,
      product.quantity,
      product.categoryId,
      product.sellerId,
      product.id
    );
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.db.run('DELETE FROM PRODUCTS WHERE id=?', productId);
  }

  async searchProducts(searchTerm: string, categoryId: string): Promise<Product[]> {
    const query = `
      SELECT * FROM PRODUCTS 
      WHERE name LIKE ? 
      AND categoryId = ?
    `;
    return this.db.all(query, [`%${searchTerm}%`, categoryId]);
  }

  getProductsByCategory(categoryId: string): Promise<Product[]> {
    return this.db.all('SELECT * FROM PRODUCTS WHERE categoryId=?', categoryId);
  }

  // Category
  async createCategory(category: Category): Promise<void> {
    await this.db.run(
      'INSERT INTO CATEGORIES (categoryId,categoryName,categoryDescription) VALUES (?,?,?)',
      category.categoryId,
      category.categoryName,
      category.categoryDescription
    );
  }

  getAllCategories(): Promise<Category[]> {
    return this.db.all('SELECT * FROM CATEGORIES');
  }

  getCategoryById(id: string): Promise<Category | undefined> {
    return this.db.get('SELECT * FROM CATEGORIES WHERE categoryId=?', id);
  }

  getCategoryByName(name: string): Promise<Category | undefined> {
    return this.db.get('SELECT * FROM CATEGORIES WHERE categoryName=?', name);
  }

  async updateCategory(category: Category): Promise<void> {
    await this.db.run(
      'UPDATE CATEGORIES SET categoryName=?,categoryDescription=? WHERE categoryId=?',
      category.categoryName,
      category.categoryDescription,
      category.categoryId
    );
  }

  async deleteCategory(id: string): Promise<void> {
    await this.db.run('DELETE FROM CATEGORIES WHERE categoryId=?', id);
  }

  // Seller Request
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

  // User
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
