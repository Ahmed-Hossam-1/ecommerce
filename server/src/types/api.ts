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

export interface UserResponse {
  user: User;
}
