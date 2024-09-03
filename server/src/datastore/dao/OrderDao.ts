import { Order, OrderItem } from '../../types/typeDao';

export interface OrderDao {
  createOrder(order: Order): Promise<void>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
}

export interface OrderItemDao {
  createOrderItem(orderItem: OrderItem): Promise<void>;
}
