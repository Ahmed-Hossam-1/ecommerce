import { Review } from '../../types/typeDao';

export interface ReviewsDao {
  createReview: (review: Review) => Promise<void>;
  getReviewsByProductId: (productId: string) => Promise<Review[]>;
  getReviewsByUserId: (userId: string, productId: string) => Promise<Review | undefined>;
}
