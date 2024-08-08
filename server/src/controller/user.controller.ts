import { db } from '../datastore';

const getAllUsers = async (__: any, res: any) => {
  const users = await db.getAllUser();
  return res.send({ users });
};

export { getAllUsers };
