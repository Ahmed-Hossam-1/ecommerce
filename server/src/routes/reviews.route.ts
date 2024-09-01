import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createReview, getReviewsByProductId } from '../controller/Reviews.controller';

export const routerReviews = Router();

routerReviews.route('/create').post(authMiddleware, createReview);
routerReviews.route('/:productId').get(authMiddleware, getReviewsByProductId as any);
