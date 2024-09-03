export interface Column {
  key: string;
  title: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  mainImage?: string;
  images?: string;
  categoryId?: string;
  sellerId?: string;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

export interface Category {
  categoryId?: string;
  categoryName: string;
  categoryDescription: string;
}

export interface Order {
  id: string;
  createdAt: Date;
  totalAmount: number;
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  review: string;
  createdAt: Date;
}

export interface SellerReq {
  id: string;
  userId: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
}
