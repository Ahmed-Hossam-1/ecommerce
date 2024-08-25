import { db } from '../datastore';
import {
  createUserRequest,
  createUserResponse,
  updateUserRequest,
  updateUserResponse,
  UsersRequest,
  UsersResponse,
} from '../types/api';
import { ExpressHandler, ExpressHandlerWithParams, User } from '../types/typeDao';
import { passwordHash } from '../utils/passwordHash';
import crypto from 'crypto';

export const getAllUsers: ExpressHandler<UsersRequest, UsersResponse> = async (__, res) => {
  const usersDb: User[] = await db.getAllUser();
  return res.status(200).send({ users: usersDb });
};

export const createUser: ExpressHandler<createUserRequest, createUserResponse> = async (
  req,
  res
) => {
  const { name, email, password, role } = req.body;
  if (!email || !name || !password || !role) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  const existing = await db.getUserById(email);
  if (existing) {
    return res.status(409).send({ error: 'User already exists' });
  }
  const newUser: User = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    password: passwordHash(password),
    role: role,
  };
  await db.createUser(newUser);
  res.status(201).send({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

export const updateUser: ExpressHandlerWithParams<
  { userId: string },
  updateUserRequest,
  updateUserResponse
> = async (req, res) => {
  const { userId } = req.params;
  const { name, email, role } = req.body;
  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }
  if (!email || !name || !role) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  const existing = await db.getUserById(userId);

  if (!existing) {
    return res.status(404).send({ error: 'User not found' });
  }

  const userWithEmail = await db.getUserByEmail(email);
  if (userWithEmail && userWithEmail.id !== userId) {
    return res.status(400).send({ error: 'Email is already in use by another user' });
  }
  const updatedUser = {
    id: userId,
    name,
    email,
    role,
  };

  await db.updateUser(updatedUser);

  res.status(200).send({
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    },
  });
};

export const deleteUser: ExpressHandlerWithParams<{ userId: string }, {}, {}> = async (
  req,
  res
) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }
  const existing = await db.getUserById(userId);
  if (!existing) {
    return res.status(400).send({ error: 'not found user' });
  }
  await db.deleteUser(userId);
  res.status(200).send({ message: 'User deleted' });
};

export const getUserByID: ExpressHandlerWithParams<
  { userId: string },
  {},
  { user: Partial<User> }
> = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }
  const user = await db.getUserById(userId);
  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }
  res.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
