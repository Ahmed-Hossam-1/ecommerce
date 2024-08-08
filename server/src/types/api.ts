import { User } from './typeDao';

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'seller';
}

export interface SignUpResponse {
  user: Pick<User, 'email' | 'id' | 'name' | 'role'>;
  jwt: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
export interface SignInResponse extends SignUpResponse {}
