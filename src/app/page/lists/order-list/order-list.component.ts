import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit{
  orderList$: Observable<Order[]> = this.orderService.getAll();

  orders: Order[] = [];

  columns = this.configService.orderTableColumns;

  constructor(
    private orderService: OrderService,
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.orderList$
    .subscribe(orders => this.orders = orders);
  }

  onEdit(order: Order):void {
   this.router.navigate(['/edit-order', order.id])


  }
  onDelete(order: Order):void {
    this.orderService.delete( order).subscribe(
      () => this.orderList$ = this.orderService.getAll(),
    )
    this.toastr.warning( 'Order is deleted!', 'WARNING!',);
  }
}
