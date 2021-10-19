import { Address } from './Address';
import { OrderItem } from './OrderItem';

export interface Order {
  id: string;
  items: Array<OrderItem>;
  shippingAddress: Address;
}
