import { User } from './typeDao';

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'seller';
}

export interface SignUpResponse {
  role: string;
  jwt: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse extends SignUpResponse {}

export interface UsersRequest {}

export interface UsersResponse {
  users?: User[] | undefined;
}

export interface createUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'seller';
}

export interface createUserResponse {
  user: Pick<User, 'id' | 'name' | 'email' | 'role'>;
}

export interface updateUserRequest extends createUserRequest {}

export interface updateUserResponse extends createUserResponse {}

export interface createSellerRequest {
  name: string;
  email: string;
  password: string;
}

export interface createSellerResponse {}
