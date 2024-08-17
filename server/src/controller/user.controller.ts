import { db } from '../datastore';
import { UsersRequest, UsersResponse } from '../types/api';
import { ExpressHandler, User } from '../types/typeDao';

export const getAllUsers: ExpressHandler<UsersRequest, UsersResponse> = async (__, res) => {
  const usersDb: User[] = await db.getAllUser();
  return res.status(200).send({ users: usersDb });
};

// export const createUser: ExpressHandler<UsersRequest, UsersResponse> = async (req, res) => {
//   const user: User = req.body;
//   await db.createUser(user);
//   return res.status(201).send({ user });
// };
