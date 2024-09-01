import { ExpressHandler, ExpressHandlerWithParams } from '../types/typeDao';
import { Review } from '../datastore/dao/ReviewsDao';
import { db } from '../datastore';
import crypto from 'crypto';

export const createReview: ExpressHandler<
  {
    productId: string;
    rating: number;
    review: string;
  },
  {}
> = async (req, res) => {
  const { productId, rating, review } = req.body;
  if (!productId || !rating || !review) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const userId = res.locals.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Check if user already reviewed this product
  const existingReview = await db.getReviewsByUserId(userId, productId);
  if (existingReview) {
    return res.status(400).json({ error: 'User already reviewed this product' });
  }

  const newReview: Review = {
    id: crypto.randomUUID(),
    userId,
    productId,
    rating,
    review,
  };

  await db.createReview(newReview);
  return res.status(200).json({ message: 'Review created successfully' });
};

export const getReviewsByProductId: ExpressHandlerWithParams<
  { productId: string },
  {},
  { reviews: Review[] }
> = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }
  const reviews = await db.getReviewsByProductId(productId);

  return res.status(200).json({ reviews });
};
