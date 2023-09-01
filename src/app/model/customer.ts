import { Address } from './address';

export class Customer {
  [x: string]: any;
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: Address = new Address();
  active: boolean = false;
}

// export const customerHeaders: string[] = [
//   'id',
//   'fisrtName',
//   'lastName',
//   'email',
//   'address',
//   'active',
// ];
