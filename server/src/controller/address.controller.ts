import { db } from '../datastore';
import { createAddressRequest, editAddressRequest } from '../types/api';
import { Address, ExpressHandler, ExpressHandlerWithParams } from '../types/typeDao';
import crypto from 'crypto';

export const createAddress: ExpressHandler<createAddressRequest, {}> = async (req, res) => {
  const { street, city, state, country, phone } = req.body;
  if (!street || !city || !state || !country || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const userId = res.locals.userId;
  if (!userId) {
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'You are not authorized to create a product' });
  }

  const address = {
    id: crypto.randomUUID(),
    userId,
    street,
    city,
    state,
    country,
    phone,
  };

  await db.createAddress(address);
  return res.status(200).json({ message: 'Address created successfully' });
};

export const getAddressByUserId: ExpressHandler<{}, { address: Address }> = async (_, res) => {
  const userId = res.locals.userId;
  if (!userId) {
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'You are not authorized to create a product' });
  }

  const address = await db.getAddressByUserId(userId);

  if (!address) {
    return res.status(404).json({ error: 'Address not found' });
  }

  return res.status(200).json({ address });
};

export const editAddress: ExpressHandlerWithParams<{ id: string }, editAddressRequest, {}> = async (
  req,
  res
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Address Id is required' });
  }

  const { street, city, state, country, phone } = req.body;
  if (!street || !city || !state || !country || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const userId = res.locals.userId;
  if (!userId) {
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'You are not authorized to create a product' });
  }

  const address = {
    id: id,
    userId,
    street,
    city,
    state,
    country,
    phone,
  };

  await db.editAddress(address);
  return res.status(200).json({ message: 'Address updated successfully' });
};
