import { Injectable } from '@angular/core';

export interface ITableColumn {
  title: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  customerTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id' },
    { title: 'Firstname', key: 'firstName' },
    { title: 'Lastname', key: 'lastName' },
    { title: 'Email', key: 'email' },
    { title: 'Address', key: 'address' },
    { title: 'Active', key: 'active' },
  ];

  productTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id' },
    { title: 'Name', key: 'name' },
    { title: 'Type', key: 'type' },
    { title: 'Category ID', key: 'catID' },
    { title: 'Description', key: 'description' },
    { title: 'Price', key: 'price' },
    { title: 'Featured', key: 'featured' },
    { title: 'Active', key: 'active' },
  ];

  billTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id' },
    { title: 'Order ID', key: 'orderID' },
    { title: 'Amount', key: 'amount' },
    { title: 'Status', key: 'status' },
  ];

  orderTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id' },
    { title: 'Customer ID', key: 'customerID' },
    { title: 'Product ID', key: 'productID' },
    { title: 'Amount', key: 'amount' },
    { title: 'Status', key: 'status' },
  ];


  constructor() { }
}
