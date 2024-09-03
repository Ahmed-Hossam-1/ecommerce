import { Category, SellerReq } from "./type";

// address
export interface createAddressReq {
  id?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

export interface updateAddressReq extends createAddressReq {}

// auth
export interface signupRequest {
  name: string;
  email: string;
  password: string;
}

export interface signinRequest {
  email: string;
  password: string;
}

// category
export interface createCategoryRequest extends Category {}
export interface updateCategoryRequest extends Category {}

// order
export interface createOrderRequest {
  totalAmount: number;
  items: { productId: string; quantity: number; price: number }[];
}

// product
export interface createProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
  mainImage: string;
  images: string[];
}
export interface createProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  mainImage: string;
  images: string[];
  categoryId: string;
  sellerId: string;
}
export interface searchProductsRequest {
  searchTerm: string;
  categoryId: string;
}

// review
export interface createReviewRequest {
  productId: string;
  rating: number;
  review: string;
}

// seller_req
export interface GetSellerReqResponse {
  requests: SellerReq[];
}

export interface createSellerReq {
  name: string;
  email: string;
  password: string;
}
