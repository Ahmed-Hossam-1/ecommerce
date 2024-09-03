import { db } from '../datastore';
import { Order, OrderItem } from '../datastore/dao/OrderDao';
import { ExpressHandler } from '../types/typeDao';
import crypto from 'crypto';
interface OrderItemRequest {
  totalAmount: number;
  items: { productId: string; quantity: number; price: number }[];
}
export const createOrder: ExpressHandler<OrderItemRequest, {}> = async (req, res) => {
  const { items, totalAmount } = req.body;

  if (!items || !items.length || !totalAmount) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const userId = res.locals.userId;
  if (!userId) {
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'You are not authorized to create a product' });
  }

  const order: Order = {
    id: crypto.randomUUID(),
    userId,
    totalAmount,
  };

  await db.createOrder(order);

  for (const item of items) {
    const orderItem: OrderItem = {
      id: crypto.randomUUID(),
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    };
    await db.createOrderItem(orderItem);
  }

  res.status(201).json({ message: 'Order created successfully' });
};

export const getOrder: ExpressHandler<{}, { orders: Order[] }> = async (_, res) => {
  const userId = res.locals.userId;
  if (!userId) {
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'You are not authorized to get orders' });
  }

  const orders = await db.getOrdersByUserId(userId);
  res.status(200).json({ orders });
};
