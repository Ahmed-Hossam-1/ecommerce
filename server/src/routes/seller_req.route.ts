import express from 'express';
import {
  createRequest,
  getAllSellerRequests,
  updateSellerRequestStatus,
} from '../controller/seller_req.controller';

export const sellerReqRouter = express.Router();
sellerReqRouter.route('/create').post(createRequest);
sellerReqRouter.route('').get(getAllSellerRequests);
sellerReqRouter.route('/update/:requestId').post(updateSellerRequestStatus);
