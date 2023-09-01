import { Customer } from "./customer";
import { Product } from "./product";

export class Order {
  [x: string]: any;
  id: number = 0;
  customerID: Customer = new Customer();
  productID: Product = new Product();
  amount: number = 0;
  status: string='';
}

// export const orderHeaders: string[] = [
//   'id',
//   'customerId',
//   'productId',
//   'amount',
//   'status',
// ];
