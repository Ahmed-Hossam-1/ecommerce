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

export interface createAddressReq {
  id?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  phone: string;
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

export interface signupArg {
  name: string;
  email: string;
  password: string;
}

export interface signinArg {
  email: string;
  password: string;
}
