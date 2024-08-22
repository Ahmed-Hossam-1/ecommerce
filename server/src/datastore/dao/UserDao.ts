import { User } from '../../types/typeDao';

export interface UserDao {
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getAllUser(): Promise<User[]>;
  createUser(user: User): Promise<void>;
  updateUser(user: Partial<User>): Promise<void>;
  deleteUser(id: string): Promise<void>;
}
