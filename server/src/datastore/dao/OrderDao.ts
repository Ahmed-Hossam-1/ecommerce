export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderDao {
  createOrder(order: Order): Promise<void>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
}

export interface OrderItemDao {
  createOrderItem(orderItem: OrderItem): Promise<void>;
}
