import { db } from '../datastore';
import { sendEmail } from '../utils/sendEmail';
import { passwordHash } from '../utils/passwordHash';
import { ExpressHandler, ExpressHandlerWithParams, SellerReq } from '../types/typeDao';
import { createSellerRequest, createSellerResponse } from '../types/api';
import crypto from 'crypto';
import { emitNewSellerRequest } from '../utils/reqRealTime';

export const createRequest: ExpressHandler<createSellerRequest, createSellerResponse> = async (
  req,
  res
) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: 'Name, email, and password are required' });
  }

  const existingSellerReq = await db.getSellerByEmail(email);
  if (existingSellerReq) {
    return res.status(400).send({ error: 'Seller already sent request' });
  }

  const existingUser = await db.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).send({ error: 'User already exists' });
  }

  const newRequest: SellerReq = {
    requestId: crypto.randomUUID(),
    userId: crypto.randomUUID(),
    name,
    email,
    password: passwordHash(password),
    status: 'pending',
  };

  await db.addSellerRequest(newRequest);

  // Send email notification
  await sendEmail(
    email,
    'Your Seller Account Request has been Received',
    `Dear ${name},\n\nYour request to become a seller has been received. We will review your request and get back to you shortly.\n\nBest regards`
  );

  emitNewSellerRequest(newRequest);

  res.status(200).send({ message: 'Request received' });
};

export const updateSellerRequestStatus: ExpressHandlerWithParams<
  { requestId: string },
  { status: 'approved' | 'rejected' },
  {}
> = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  if (!requestId) {
    return res.status(400).send({ error: 'Request ID is required' });
  }

  if (!status) {
    return res.status(400).send({ error: 'Status is required' });
  }

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).send({ error: 'Invalid status' });
  }

  const request = await db.getSellerRequestById(requestId);
  if (!request) {
    return res.status(404).send({ error: 'Request not found' });
  }

  if (status === 'approved') {
    const hashedPassword = passwordHash(request.password);

    await db.createUser({
      id: request.userId,
      name: request.name,
      email: request.email,
      password: hashedPassword,
      role: 'seller',
    });

    // Send email notification
    await sendEmail(
      request.email,
      'Your Seller Account Request has been Approved',
      `Dear ${request.name},\n\nYour request to become a seller has been approved. You can now log in to your account and start selling.\n\nBest regards`
    );
  }

  await db.updateSellerRequestStatus(requestId, status);

  res.status(200).send({ message: `Request ${status}` });
};

export const getAllSellerRequests: ExpressHandler<{}, { requests: SellerReq[] }> = async (
  __,
  res
) => {
  const requests = await db.getAllSellerRequests();

  res.status(200).send({ requests });
};
