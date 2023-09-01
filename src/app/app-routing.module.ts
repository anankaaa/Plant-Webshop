import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProductListComponent } from './page/lists/product-list/product-list.component';
import { CustomerListComponent } from './page/lists/customer-list/customer-list.component';
import { OrderListComponent } from './page/lists/order-list/order-list.component';
import { BillListComponent } from './page/lists/bill-list/bill-list.component';
import { EditCustomerComponent } from './page/editors/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/editors/edit-order/edit-order.component';
import { EditBillComponent } from './page/editors/edit-bill/edit-bill.component';
import { EditProductComponent } from './page/editors/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
  },
  {
    path: 'customers',
    component: CustomerListComponent,
  },

  {
    path: 'edit-customer/:id',
    component: EditCustomerComponent,
  },
  {
    path: 'orders',
    component: OrderListComponent,
  },
  {
    path: 'edit-order/:id',
    component: EditOrderComponent
  },
  {
    path: 'bills',
    component: BillListComponent,
  },
  {
    path: 'edit-bill/:id',
    component: EditBillComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
