import { db } from '../datastore';
import { ExpressHandler } from '../types/typeDao';
import { verifyJwt } from '../utils/auth';

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
      code: 401,
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const payload = verifyJwt(token);
    const user = await db.getUserById(payload.userId!);
    if (!user) {
      throw new Error('User not found');
    }
    res.locals.userId = user.id;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({
        error: 'Invalid token',
        details: error instanceof Error ? error.message : undefined,
      });
  }
};
