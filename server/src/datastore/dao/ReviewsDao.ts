export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  review: string;
}

export interface ReviewsDao {
  createReview: (review: Review) => Promise<void>;
  getReviewsByProductId: (productId: string) => Promise<Review[]>;
  getReviewsByUserId: (userId: string, productId: string) => Promise<Review | undefined>;
}
