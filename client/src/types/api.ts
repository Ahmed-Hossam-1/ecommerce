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
