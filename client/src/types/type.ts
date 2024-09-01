export interface Column {
  key: string;
  title: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
}

export interface requests {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  mainImage?: string;
  images?: string;
  categoryId?: string;
  sellerId?: string;
}
