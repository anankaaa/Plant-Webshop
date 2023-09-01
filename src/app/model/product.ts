import { Category } from './category';

export class Product {
  [x: string]: any;
  id: number = 0;
  name: string = '';
  type: string = '';
  catID: Category = new Category();
  description: string = '';
  price: number = 0;
  featured: boolean = true;
  active: boolean = true;
}

export const productHeaders: string[] = [
  'id',
  'name',
  'type',
  'catId',
  'description',
  'price',
  'featured',
  'active',
];
