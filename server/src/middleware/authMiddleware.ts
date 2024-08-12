import { db } from '../datastore';
import { ExpressHandler } from '../types/typeDao';
import { verifyJwt } from '../utils/auth';

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
  const authHeader = req.headers['Authorization'] || req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
      code: 401,
    });
  }
  const token = (authHeader as string).split(' ')[1];
  try {
    const payload = verifyJwt(token);
    // console.log(payload);
    const user = await db.getUserById(payload.userId!);
    if (!user) {
      throw 'not found user';
    }
    res.locals.userId = user.id;

    return next();
  } catch {
    return res.status(401).send({ error: 'bad token' });
  }
};
