import { User } from '../../types/typeDao';

export interface UserDao {
  createUser(user: User): Promise<void>;
  deleteUser(id: string): Promise<void>;
  getAllUser(): Promise<User>;
  getUserById(id: string): Promise<User>;
  updateUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}
