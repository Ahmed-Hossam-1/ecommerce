import { SellerReq } from '../../types/typeDao';

export interface SellerReqDao {
  getAllSellerRequests(): Promise<SellerReq[]>;
  addSellerRequest(seller: SellerReq): Promise<void>;
  updateSellerRequestStatus(requestId: string, status: string): Promise<void>;
  getSellerRequestById(requestId: string): Promise<SellerReq | undefined>;
  getSellerByEmail(email: string): Promise<SellerReq | undefined>;
}
