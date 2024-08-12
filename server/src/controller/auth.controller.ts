import { db } from '../datastore';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../types/api';
import { ExpressHandler, User } from '../types/typeDao';
import { createJwt } from '../utils/auth';
import { passwordHash } from '../utils/passwordHash';
import crypto from 'crypto';

export const signupController: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  if (!email || !name || !password || !role) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  const existing = await db.getUserByEmail(email);
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
  const jwt = await createJwt({ userId: newUser.id });
  res.status(201).send({
    jwt,
    role: newUser.role,
  });
};

export const signIn: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400);
  }

  const existing = await db.getUserByEmail(email);
  if (!existing || existing.password !== passwordHash(password)) {
    return res.sendStatus(403);
  }

  const jwt = await createJwt({ userId: existing.id });

  return res.status(200).send({
    jwt,
    role: existing.role,
  });
};
