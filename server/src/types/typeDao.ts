import { RequestHandler } from 'express';

// user
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'seller';
}

export interface SellerReq {
  requestId: string;
  userId: string;
  name: string;
  email: string;
  password: string;
  status: 'approved' | 'rejected' | 'pending';
}

// express handler
export type withError<T> = T & { error: string; message: string };
export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<withError<Res>>,
  Partial<Req>,
  any
>;

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<withError<Res>>,
  Partial<Req>,
  any
>;

export interface jwtType {
  userId: string | undefined;
}
