import { Category, Product, User } from './typeDao';

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'seller';
}

export interface SignUpResponse {
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
  password?: string;
  role: 'user' | 'admin' | 'seller';
}

// export interface createUserResponse {
//   user: Pick<User, 'id' | 'name' | 'email' | 'role'>;
// }

export interface updateUserRequest extends createUserRequest {}

// export interface updateUserResponse extends createUserResponse {}

export interface createSellerRequest {
  name: string;
  email: string;
  password: string;
}

export interface createSellerResponse {}

export interface createCategoryRequest {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
}

export interface createCategoryResponse {}

export interface getAllCategoriesRequest {}

export interface getAllCategoriesResponse {
  categories: Category[];
}

export interface updateCategoryRequest {
  categoryName: string;
  categoryDescription: string;
}

export interface updateCategoryResponse {}

export interface createProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
}

export interface createProductResponse {
  product: Partial<Product>;
}

export interface updateProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
}

export interface createAddressRequest {
  street: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

export interface editAddressRequest extends createAddressRequest {}

export interface OrderItemRequest {
  totalAmount: number;
  items: { productId: string; quantity: number; price: number }[];
}

export interface createReviewRequest {
  productId: string;
  rating: number;
  review: string;
}
