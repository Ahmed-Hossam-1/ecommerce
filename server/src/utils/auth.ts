import jwt from 'jsonwebtoken';
import { jwtType } from '../types/typeDao';

export const createJwt = async (payload: jwtType): Promise<string> => {
  const token = await jwt.sign(payload, getJwt(), {
    expiresIn: '7d',
  });
  return token;
};

export const verifyJwt = (token: string): jwtType => {
  return jwt.verify(token, getJwt()) as jwtType;
};

const getJwt = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT SECRET is not defined');
  }
  return secret;
};
