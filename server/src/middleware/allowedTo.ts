import { Response, NextFunction } from 'express';
import { db } from '../datastore';

export const allowedTo = (roles: string[]) => {
  return async (_: any, res: Response, next: NextFunction) => {
    const userId = res.locals.userId;
    const user = await db.getUserById(userId);

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
